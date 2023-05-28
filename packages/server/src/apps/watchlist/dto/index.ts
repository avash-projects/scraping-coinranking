import { IsNotEmpty } from "class-validator";
export class WatchlistDto {
    @IsNotEmpty()
    symbol: string;
    
    @IsNotEmpty()
    min_price: number;

    @IsNotEmpty()
    max_price: number;
}