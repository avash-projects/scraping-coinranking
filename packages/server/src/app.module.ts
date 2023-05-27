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

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScraperModule,
    SocketModule,
    CoinModule,
    WatchlistModule,
  ],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly coinService: CoinService,
    private readonly scraperService: ScraperService
  ) {}
  
  async onModuleInit() {
    const coinData = await this.coinService.getAll()
    if (coinData.length === 0) {
      await this.scraperService.scrapingCron()
      console.log("Initial fetch complete.")
    }
  }
}
