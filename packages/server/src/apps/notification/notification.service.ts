import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'src/schemas/notification.schema';
import { NotificationDto } from './dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel('Notification')
        private readonly notificationModel: Model<Notification>,
    ) { }

    getAll() {
        return this.notificationModel.find().sort({ createdAt: -1 });
    }

    create(notification: NotificationDto) {
        const newNotification = new this.notificationModel(notification);
        return newNotification.save();
    }

    getUnread() {
        const unreadNotificationsQuery = this.notificationModel.find({ isRead: false }).sort({ createdAt: -1 });;
        const unreadNotificationsCountQuery = this.notificationModel.countDocuments({ isRead: false });
        return Promise.all([unreadNotificationsQuery, unreadNotificationsCountQuery]);
    }

    bulkInsert(data: Notification[]) {
        return this.notificationModel.insertMany(data);
    }

    markAllRead() {
        return this.notificationModel.updateMany(({ $set: { isRead: true } }))
    }
}
