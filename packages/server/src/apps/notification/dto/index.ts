import { IsNotEmpty } from "class-validator";
export class NotificationDto {
    @IsNotEmpty()
    message: string;
    
    @IsNotEmpty()
    isRead: boolean;
}