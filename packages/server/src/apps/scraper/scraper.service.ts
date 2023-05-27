import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { CheerioService } from '../cheerio/cheerio.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SocketGateway } from '../socket/socket.gateway';
import { Coin } from '../../schemas/coin.schema';
import { CoinService } from '../coin/coin.service';
@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cheerioService: CheerioService,
    private readonly socketGateway: SocketGateway,
    private readonly coinService: CoinService,
  ) { }

  private scrapeConfig = parseInt(process.env.PAGES_TO_SCRAPE);
  private scrapeSite = process.env.SCRAPE_SITE_URL;

  @Cron('0 */1 * * * *')
  async scrapingCron() {
    this.socketGateway.startScraping();
    const { scrapedData } = await this.scrape();
    await this.coinService.deleteAll();
    await this.coinService.bulkInsert(scrapedData);
    this.socketGateway.endScraping(scrapedData.length);
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
}
