import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('/')
    @HttpCode(201)
    async createNotification(@Body() notification: NotificationDto) {
        const data = await this.notificationService.create(notification);
        return { data, success: true };
    }

    @Get('/all')
    @HttpCode(200)
    async getAllNotifications() {
        return await this.notificationService.getAll();
    }

    @Get('/unread')
    @HttpCode(200)
    async getUnreadNotifications() {
        const [notifications, unreadCount] = await this.notificationService.getUnread();
        return {
            data: { notifications, unreadCount },
            success: true
        };
    }

    @Post('/mark-all-read')
    @HttpCode(200)
    async markAllRead() {
        await this.notificationService.markAllRead();
        return {
            success: true
        };
    }
}
