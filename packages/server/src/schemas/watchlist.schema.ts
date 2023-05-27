import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatchlistDocument = HydratedDocument<Watchlist>;

@Schema()
export class Watchlist {
  @Prop()
  symbol: string;

  @Prop()
  min_price: number;

  @Prop()
  max_price: number;

}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
