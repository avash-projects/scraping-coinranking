import { Row, Typography } from "antd";
import CoinsTable from "./components/CoinsTable";
const DashboardHome = () => {
  return (
    <div
     style={{
      height: '70vh'
     }}
    >
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>🤑🚀🌙</Typography.Title>
      </Row>
      <Row>
        <CoinsTable />
      </Row>
    </div>
  );
};

export default DashboardHome;
