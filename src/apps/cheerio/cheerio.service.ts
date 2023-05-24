import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CheerioService {
  init(data: any) {
    return cheerio.load(data);
  }

  scrapeLastPageNumber(data: any) {
    const $ = data;
    const paginationList = $('.pagination__page');
    let lastPage = 0;
    paginationList?.each((_, el) => {
      const pageNumber = parseInt($(el).text());
      lastPage = pageNumber > lastPage ? pageNumber : lastPage;
    });
    return lastPage;
  }

  scrapeCoinTable(data: any) {
    const $ = data;
    const paginationList = $('.pagination__page');
    let largestPage = 0;
    paginationList?.each((_, el) => {
      const pageNumber = parseInt($(el).text());
      largestPage = pageNumber > largestPage ? pageNumber : largestPage;
    });
    const selectedInformation = [];
    $('tr.table__row').each((_, element) => {
      const $row = $(element);

      const rank = $row.find('.profile__rank').text().trim();
      const name = $row.find('.profile__name a').text().trim();
      const symbol = $row.find('.profile__subtitle-name').text().trim();
      const price = $row
        .find('.valuta--light')
        .first()
        .text()
        .trim()
        .replace(/\s|\n/g, '');
      const marketCap = $row
        .find('.table__mobile-subtitle')
        .text()
        .trim()
        .replace(/\s/g, '');
      const change = $row.find('.change--light').text().trim();
      const imageUrl = $row.find('.profile__logo').attr('src');
      if (
        [rank, name, symbol, price, marketCap, change, imageUrl].every(Boolean)
      ) {
        const info = {
          rank,
          name,
          symbol,
          price,
          marketCap,
          change,
          imageUrl,
        };

        selectedInformation.push(info);
      }
    });
    return selectedInformation;
  }
}
