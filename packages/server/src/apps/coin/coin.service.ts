import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin } from 'src/schemas/coin.schema';

@Injectable()
export class CoinService {
  constructor(
    @InjectModel('Coin')
    private readonly coinModel: Model<Coin>,
  ) {}

  bulkInsert(data: Coin[]) {
    return this.coinModel.insertMany(data);
  }

  getAll() {
    return this.coinModel.find();
  }

  deleteAll() {
    return this.coinModel.deleteMany({});
  }
}
