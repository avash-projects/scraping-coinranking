import { Row, Typography } from "antd";
import CoinsTable from "./components/CoinsTable";
const DashboardHome = () => {
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2}>🤑🚀🌙</Typography.Title>
      </Row>
      <Row>
        <CoinsTable />
      </Row>
    </div>
  );
};

export default DashboardHome;
