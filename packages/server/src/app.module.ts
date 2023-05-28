import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { ScraperModule } from './apps/scraper/scraper.module';
import { SocketModule } from './apps/socket/socket.module';
import { CoinModule } from './apps/coin/coin.module';
import { CoinService } from './apps/coin/coin.service';
import { ScraperService } from './apps/scraper/scraper.service';
import { WatchlistModule } from './apps/watchlist/watchlist.module';
import { HistoryModule } from './apps/history/history.module';
import { NotificationModule } from './apps/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScraperModule,
    SocketModule,
    CoinModule,
    WatchlistModule,
    HistoryModule,
    NotificationModule
  ],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly coinService: CoinService,
    private readonly scraperService: ScraperService
  ) { }

  async onModuleInit() {
    const coinData = await this.coinService.getAll()
    if (coinData.length === 0) {
      console.log("#### STARTING FIRST SCRAPE ####")
      await this.scraperService.scrapingCron()
      console.log("### FIRST SCRAPE COMPLETE ###")
    }
  }
}
