import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { APP_CONSTS } from '@constants';
import { CheerioService } from '../cheerio/cheerio.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cheerioService: CheerioService,
  ) {}
  async scrape() {
    const { data } = await this.httpService.axiosRef.get(
      APP_CONSTS.SITE_TO_SCRAPE,
    );
    const pageData = this.cheerioService.init(data);
    const lastPage = this.cheerioService.scrapeLastPageNumber(pageData);
    const coinData = this.cheerioService.scrapeCoinTable(pageData);
    return { lastPage, coinData };
  }
}
