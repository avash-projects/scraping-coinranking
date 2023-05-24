import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { HttpModule } from '@nestjs/axios';
import { ScraperController } from './scraper.controller';
import { CheerioModule } from '../cheerio/cheerio.module';

@Module({
  imports: [HttpModule, CheerioModule],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
