import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { ScraperModule } from './apps/scraper/scraper.module';
import { SocketModule } from './apps/socket/socket.module';
@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), ScraperModule, SocketModule],
})
export class AppModule {}
