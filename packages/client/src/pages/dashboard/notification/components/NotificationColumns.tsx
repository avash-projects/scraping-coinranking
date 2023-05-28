import { NotificationColumn } from "../../../../types";
import { getLocalDateTime } from "../../../../libs/date";
import { Tag } from "antd";

export const NotificationTableColumns: NotificationColumn[] = [
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
    {
        title: 'Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_, record) => {
            return (
                <>
                    {getLocalDateTime(record.createdAt)}
                </>
            )
        },
    },
    {
        dataIndex: 'isRead',
        key: 'isRead',
        render: (_, record) => {
            if(record.isRead){
                return
            }
            return (
                <>
                    <Tag color="green">Unread</Tag>
                </>
            )
        }
    }

];