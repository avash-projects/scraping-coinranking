import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ScraperModule } from './apps/scraper/scraper.module';
@Module({
  imports: [ConfigModule.forRoot(), ScraperModule],
})
export class AppModule {}
