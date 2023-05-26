import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { ScraperModule } from './apps/scraper/scraper.module';
import { SocketModule } from './apps/socket/socket.module';
import { CoinModule } from './apps/coin/coin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScraperModule,
    SocketModule,
    CoinModule,
  ],
})
export class AppModule {}
