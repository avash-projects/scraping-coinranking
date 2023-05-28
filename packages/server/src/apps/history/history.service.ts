import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryDto } from './dto';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel('History')
        private readonly historyModel: Model<History>,
    ) { }


    add(payload: HistoryDto) {
        const history = new this.historyModel(payload);
        return history.save();
    }

    getAll() {
        return this.historyModel.find();
    }

    getLatest() {
        return this.historyModel.findOne().sort({ scrapeDate: -1})
    }
}
