import { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import WatchlistDrawer from './components/WatchlistDrawer';
import WatchlistTable from './components/WatchlistTable';

const Watchlist = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Typography.Title level={4}>Watchlist</Typography.Title>
        <Button
          onClick={() => setDrawerOpen(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </Row>
      <WatchlistTable />
      <WatchlistDrawer
        isOpen={drawerOpen}
        handleOpen={setDrawerOpen}
      />
    </div>
  );
};

export default Watchlist;
