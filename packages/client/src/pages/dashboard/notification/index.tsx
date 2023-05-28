import { Button, Row, Typography } from "antd";
import NotificationTable from "./components/NotificationsTable";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
const AllNotification = () => {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate("/home")
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
          onClick={handleHome}
          type="link"
          icon={(<LeftOutlined />)}
        >
          Return home
        </Button>
      </Row>
      <Row>
        <NotificationTable />
      </Row>
    </div>
  );
};

export default AllNotification;
