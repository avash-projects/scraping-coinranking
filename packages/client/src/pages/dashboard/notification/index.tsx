import { Row, Typography } from "antd";
import NotificationTable from "./components/NotificationsTable";
const AllNotification = () => {
  return (
    <div
      style={{
        height: '70vh'
      }}
    >
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>Notifications</Typography.Title>
      </Row>
      <Row>
        <NotificationTable />
      </Row>
    </div>
  );
};

export default AllNotification;
