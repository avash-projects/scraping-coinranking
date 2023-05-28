import { NotificationColumn } from "../../../../types";
import { getLocalDateTime } from "../../../../libs/date";

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
    }
];