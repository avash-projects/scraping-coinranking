import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { HttpModule } from '@nestjs/axios';
import { ScraperController } from './scraper.controller';
import { CheerioModule } from '../cheerio/cheerio.module';
import { SocketModule } from '../socket/socket.module';
import { CoinModule } from '../coin/coin.module';
import { HistoryModule } from '../history/history.module';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [HttpModule, CheerioModule, SocketModule, CoinModule, HistoryModule, WatchlistModule, NotificationModule],
  providers: [ScraperService],
  controllers: [ScraperController],
  exports: [ScraperService]
})
export class ScraperModule { }
