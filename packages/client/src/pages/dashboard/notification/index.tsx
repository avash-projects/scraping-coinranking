import { Button, Row, Typography } from "antd";
import NotificationTable from "./components/NotificationsTable";
import { useMarkAllRead } from "../../../layouts/dashboardLayout/hooks/useMarkAllRead";
import { useQueryClient } from "@tanstack/react-query";
const AllNotification = () => {
  const queryClient = useQueryClient();
  const markAllRead = useMarkAllRead();

  const handleMarkRead = () => {
    markAllRead.mutate();
    queryClient.invalidateQueries({queryKey: ['notification','all-notification']});
  }

  return (
    <div
      style={{
        height: '70vh'
      }}
    >
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>Notifications</Typography.Title>
        <Button
          onClick={handleMarkRead}
          type="primary"
        >
          Mark all as read
        </Button>
      </Row>
      <Row>
        <NotificationTable />
      </Row>
    </div>
  );
};

export default AllNotification;
