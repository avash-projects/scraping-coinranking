import { Table } from "antd"
import { NotificationTableColumns } from "./NotificationColumns"
import { useFetchNotification } from "../hooks/useFetchNotification"

const NotificationsTable = () => {
    const { notification, isLoadingNotification } = useFetchNotification()
    
    return (
        <>
            <Table
                pagination={{
                    pageSize: 10,
                }}
                size="middle"
                style={{ width: '100%' }}
                loading={isLoadingNotification}
                dataSource={notification}
                columns={NotificationTableColumns}
            />
        </>
    )
}

export default NotificationsTable