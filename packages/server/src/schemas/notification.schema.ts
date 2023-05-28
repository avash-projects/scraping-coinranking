import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
    timestamps: true
})
export class Notification {
    @Prop({ required: true })
    message: string;

    @Prop({ default: false })
    isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
