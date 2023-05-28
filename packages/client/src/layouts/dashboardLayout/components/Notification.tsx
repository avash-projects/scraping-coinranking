import { BellTwoTone } from "@ant-design/icons";
import { Badge, Button, Drawer, List, Typography } from "antd";
import { useState } from "react";
import { useMarkAllRead } from "../hooks/useMarkAllRead";
import { getLocalDateTime } from "../../../libs/date";

interface NotificationItem {
  createdAt: string;
  isRead: boolean;
  message: string;
  updatedAt: string;
}
interface NotificationProps {
  notifications: NotificationItem[]
  unreadCount: number
}

const Notification = ({ notifications, unreadCount }: NotificationProps) => {
  const markAllRead = useMarkAllRead()
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleMarkAll = () => {
    markAllRead.mutate();
    setNotificationsOpen(false);
  }

  return (
    <>
      <span
        style={{ marginRight: '32px' }}
      >
        <Badge count={unreadCount}>
          <BellTwoTone
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </span>

      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        size="large"
        maskClosable
        extra={(
          <>
            <Button
              type="link"
              onClick={handleMarkAll}
              disabled={!notifications.length}
            >
              Mark all as read
            </Button>
          </>
        )}
      >
        <List
          dataSource={notifications}
          renderItem={(item) => {
            return (
              <List.Item>
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography.Text type="secondary">{getLocalDateTime(item.createdAt)}</Typography.Text>
                  <Typography.Text>{item.message}</Typography.Text>
                </span>
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </>
  );
};

export default Notification