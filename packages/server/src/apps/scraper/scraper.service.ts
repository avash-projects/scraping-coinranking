import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { CheerioService } from '../cheerio/cheerio.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SocketGateway } from '../socket/socket.gateway';
import { Coin } from '../../schemas/coin.schema';
import { CoinService } from '../coin/coin.service';
import { HistoryService } from '../history/history.service';
import { WatchlistService } from '../watchlist/watchlist.service';
import { NotificationService } from '../notification/notification.service';
@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cheerioService: CheerioService,
    private readonly socketGateway: SocketGateway,
    private readonly historyService: HistoryService,
    private readonly coinService: CoinService,
    private readonly watchlistService: WatchlistService,
    private readonly notificationService: NotificationService
  ) { }

  private scrapeConfig = parseInt(process.env.PAGES_TO_SCRAPE);
  private scrapeSite = process.env.SCRAPE_SITE_URL;

  @Cron('0 */1 * * * *')
  async scrapingCron() {
    this.socketGateway.startScraping();
    const { scrapedData } = await this.scrape();
    await this.coinService.deleteAll();
    await this.coinService.bulkInsert(scrapedData);
    await this.historyService.add({
      scrapeDate: new Date(),
      totalRecords: scrapedData.length
    })
    this.socketGateway.endScraping();
    this.priceCompare(scrapedData)
  }

  async scrape(): Promise<{
    lastPage: number;
    scrapedPages: number;
    scrapedData: Coin[];
  }> {
    let page = 1;
    const { data } = await this.httpService.axiosRef.get(`${this.scrapeSite}`);
    const pageData = this.cheerioService.init(data);
    const lastPage: number = this.cheerioService.scrapeLastPageNumber(pageData);
    const pagesToScrape =
      lastPage < this.scrapeConfig ? lastPage : this.scrapeConfig;
    const allData: Coin[] = [];
    const promises = [];
    while (page !== pagesToScrape + 1) {
      promises.push(
        this.httpService.axiosRef.get(`${this.scrapeSite}?page=${page}`),
      );
      page++;
    }
    const responses = await Promise.all(promises);

    for (const response of responses) {
      const pageData = this.cheerioService.init(response.data);
      const coinData = this.cheerioService.scrapeCoinTable(pageData);
      allData.push(...coinData);
    }

    return { lastPage, scrapedPages: pagesToScrape, scrapedData: allData };
  }

  async priceCompare(
    coins: Coin[]
  ) {
    const watchlistData = await this.watchlistService.getAll();
    const watchlistPrice = coins.filter(coin => watchlistData.some(item => item.symbol === coin.symbol));
    const cleanPrice = watchlistPrice.map(coin => ({
      ...coin,
      price: parseFloat(coin.price.replace(/[$,]/g, ""))
    }));
    const notification = cleanPrice.map(obj => {
      const matchingObj = watchlistData
        .find(item => item.symbol === obj.symbol);
      if (matchingObj) {
        const { min_price, max_price } = matchingObj;
        const price = obj.price;
        if (price < min_price || price > max_price) {
          return ({
            message: `${obj.symbol} is on the move, The price has changed by ${obj.change} in 24 hours to $${obj.price}.`,
            isRead: false
          })
        }
      }
      return;
    }).filter(obj => obj);
    if (notification.length !== 0) {
      await this.notificationService.bulkInsert(notification)
      this.socketGateway.priceNotification();
    }
  }
}
