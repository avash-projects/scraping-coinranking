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

  @Cron('*/5 * * * *') //every five minutes
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
    //get price of coins in watchlist
    const watchlistPrice = coins.filter(coin => watchlistData.some(item => item.symbol === coin.symbol));
    // check if any coins moved out of the price list
    const outOfPricelist = watchlistData.filter(data => !watchlistPrice.some(item => item.symbol === data.symbol))
    // preapre notifications for out of list coins
    const outOfListNotification = outOfPricelist.map(d => ({
      message: `Oops, looks like ${d.symbol} moved out of the price list.`,
      isRead: false
    }))
    // clean price data
    const cleanPrice = watchlistPrice.map(({ symbol, price, change, ...rest }) => ({
      change,
      symbol,
      price: parseFloat(price.replace(/[$,]/g, ""))
    }));

    const notification = cleanPrice
      .filter(obj => {
        const matchingObj = watchlistData.find(item => item.symbol === obj.symbol);
        if (matchingObj) {
          const { min_price, max_price } = matchingObj;
          const price = obj.price;
          return price < min_price || price > max_price;
        }
        return false;
      })
      .map(obj => ({
        message: `${obj.symbol} is on the move, The price has changed by ${obj.change} in 24 hours to $${obj.price}.`,
        isRead: false
      }));

    await this.notificationService.bulkInsert([...notification, ...outOfListNotification])
    this.socketGateway.priceNotification();
  }
}
