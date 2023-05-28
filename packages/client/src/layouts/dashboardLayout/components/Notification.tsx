import { BellTwoTone } from "@ant-design/icons";
import { Badge, Button, Divider, Drawer, List, Typography } from "antd";
import { useState } from "react";
import { useMarkAllRead } from "../hooks/useMarkAllRead";
import { getLocalDateTime } from "../../../libs/date";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const markAllRead = useMarkAllRead()
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleMarkAll = () => {
    markAllRead.mutate();
    setNotificationsOpen(false);
  }

  const handleViewAll = () => {
    navigate('/notifications');
    setNotificationsOpen(false);
    return 1;
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
              disabled={!notifications?.length}
            >
              Mark all as read
            </Button>
          </>
        )}
      >
        <List
          dataSource={notifications?.slice(0, 10)}
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

        <Divider />
        <Button
          type="default"
          onClick={handleViewAll}
          disabled={!notifications?.length}
        >
          View all notifications
        </ Button>
      </Drawer>
    </>
  );
};

export default Notification