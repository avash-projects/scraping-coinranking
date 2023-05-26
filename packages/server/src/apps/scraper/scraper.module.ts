import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { HttpModule } from '@nestjs/axios';
import { ScraperController } from './scraper.controller';
import { CheerioModule } from '../cheerio/cheerio.module';
import { SocketModule } from '../socket/socket.module';
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [HttpModule, CheerioModule, SocketModule, CoinModule],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
