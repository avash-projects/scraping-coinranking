import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { APP_CONSTS } from '@constants';
import { CheerioService } from '../cheerio/cheerio.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SocketGateway } from '../socket/socket.gateway';
@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cheerioService: CheerioService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  scrapingCron() {
    console.log('called every 10 secs');
    this.socketGateway.startScraping();
    setTimeout(() => {
      this.socketGateway.endScraping();
    }, 5000);
  }

  async scrape() {
    let page = 1;
    const { data } = await this.httpService.axiosRef.get(
      `${APP_CONSTS.SITE_TO_SCRAPE}?page=${page}`,
    );
    const pageData = this.cheerioService.init(data);
    // const lastPage: number = this.cheerioService.scrapeLastPageNumber(pageData);
    const lastPage = 100;

    // const pagesToScrape =
    //   lastPage <= parseInt(APP_CONSTS.PAGES_TO_SCRAPE)
    //     ? lastPage
    //     : APP_CONSTS.PAGES_TO_SCRAPE;
    const allData = [];
    const promises = [];

    while (page !== lastPage + 1) {
      page++;
      promises.push(
        this.httpService.axiosRef.get(
          `${APP_CONSTS.SITE_TO_SCRAPE}?page=${page}`,
        ),
      );
    }
    const responses = await Promise.all(promises);

    for (const response of responses) {
      const pageData = this.cheerioService.init(response.data);
      const coinData = this.cheerioService.scrapeCoinTable(pageData);
      allData.push(...coinData);
    }

    // while (page !== lastPage + 1) {
    //   console.log(page);
    //   const { data } = await this.httpService.axiosRef.get(
    //     `${APP_CONSTS.SITE_TO_SCRAPE}?page=${page}`,
    //   );
    //   const cheerioData = this.cheerioService.init(data);
    //   const coinData = this.cheerioService.scrapeCoinTable(cheerioData);
    //   allData.push(...coinData);
    //   page++;
    // }

    return { lastPage, allData };
  }
}
