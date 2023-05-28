import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

@Schema({
    capped: 1000000 //1MB
})
export class History {
    @Prop({
        type: Date,
        required: true
    })
    scrapeDate: string;

    @Prop({
        required: true
    })
    totalRecords: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
