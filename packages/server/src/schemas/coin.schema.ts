import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoinDocument = HydratedDocument<Coin>;

@Schema()
export class Coin {
  @Prop()
  rank: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  price: string;

  @Prop()
  marketCap: string;

  @Prop()
  change: string;

  @Prop()
  imageUrl: string;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
