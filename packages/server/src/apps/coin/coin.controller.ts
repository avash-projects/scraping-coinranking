import { Controller, Delete, Get, HttpCode } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get('/all')
  @HttpCode(200)
  async getAll() {
    const data = await this.coinService.getAll();
    return { data, success: true };
  }

  @Delete('/all')
  @HttpCode(200)
  async deleteAll() {
    return await this.coinService.deleteAll();
  }
}
