import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchlistSchema } from 'src/schemas/watchlist.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Watchlist', schema: WatchlistSchema }])],
  providers: [WatchlistService],
  controllers: [WatchlistController],
  exports: [WatchlistService]
})
export class WatchlistModule { }
