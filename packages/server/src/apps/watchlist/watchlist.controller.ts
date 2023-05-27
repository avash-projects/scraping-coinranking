import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDto } from './dto';

@Controller('watchlist')
export class WatchlistController {
    constructor(
        private readonly watchlistService: WatchlistService
    ) { }

    @Post('/')
    @HttpCode(201)
    async add(
        @Body() data: WatchlistDto
    ) {
        return await this.watchlistService.add(data);
    }

    @Get('/all')
    @HttpCode(200)
    async getAll() {
        const data = await this.watchlistService.getAll();
        return { data, success: true };
    }

    @Delete('/:symbol')
    @HttpCode(200)
    async deleteOnel(
        @Param('symbol') symbol: string
    ) {
        return await this.watchlistService.deleteOne(symbol);
    }
}
