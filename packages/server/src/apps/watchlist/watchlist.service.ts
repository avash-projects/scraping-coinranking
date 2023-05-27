import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Watchlist } from 'src/schemas/watchlist.schema';
import { WatchlistDto } from './dto';

@Injectable()
export class WatchlistService {
    constructor(
        @InjectModel('Watchlist')
        private readonly watchlistModel: Model<Watchlist>,
    ) { }

    add(payload: WatchlistDto) {
        const wl = new this.watchlistModel(payload);
        return wl.save();
    }

    getAll() {
        return this.watchlistModel.find();
    }

    deleteOne(symbol: string) {
        return this.watchlistModel.findOneAndDelete({
            symbol: symbol
        })
    }
}
