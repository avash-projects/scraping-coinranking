import { Table } from "antd"
import { NotificationTableColumns } from "./NotificationColumns"

const NotificationsTable = () => {
    return (
        <>
            <Table
                pagination={{
                    pageSize: 10,
                }}
                size="middle"
                style={{ width: '100%' }}
                loading={false}
                dataSource={[]}
                columns={NotificationTableColumns}
            />
        </>
    )
}

export default NotificationsTable