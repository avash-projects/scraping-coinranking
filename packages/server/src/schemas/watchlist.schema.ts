import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatchlistDocument = HydratedDocument<Watchlist>;

@Schema()
export class Watchlist {
  @Prop({
    required: true
  })
  symbol: string;

  @Prop({
    required: true
  })
  min_price: number;

  @Prop({
    required: true
  })
  max_price: number;

}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
