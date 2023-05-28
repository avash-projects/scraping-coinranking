import { BellTwoTone } from "@ant-design/icons";
import { Badge, Button, Divider, Drawer, List, Tag, Typography } from "antd";
import { useState } from "react";
import { useMarkAllRead } from "../hooks/useMarkAllRead";
import { getLocalDateTime } from "../../../libs/date";
import { useNavigate } from "react-router-dom";
import { useFetchUnread } from "../hooks/useFetchUnread";
import { NotificationItem } from "../../../types";

const Notification = () => {
  const navigate = useNavigate();
  const markAllRead = useMarkAllRead();
  const { notifications, unreadCount } = useFetchUnread();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleMarkAll = () => {
    markAllRead.mutate();
    setNotificationsOpen(false);
  }

  const handleViewAll = () => {
    navigate('/notifications');
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
              size="large"
              onClick={handleViewAll}
            >
              View all notifications
            </ Button>
            <Button
              type="primary"
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
          renderItem={(item: NotificationItem) => {
            return (
              <List.Item>
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography.Text type="secondary" style={{ display: "flex", justifyContent: "space-between" }}>
                    {getLocalDateTime(item.createdAt)}
                    {
                      !item?.isRead && <Tag color="green">new</Tag>
                    }
                  </Typography.Text>
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