import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService,
    ) { }

    @Get('/latest')
    @HttpCode(200)
    async getLatest() {
        const data = await this.historyService.getLatest();
        return { data, success: true }
    }
}
