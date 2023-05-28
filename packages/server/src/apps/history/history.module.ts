import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistorySchema } from 'src/schemas/history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }])],
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
