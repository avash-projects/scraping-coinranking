import { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import WatchlistDrawer from './components/WatchlistDrawer';
import WatchlistTable from './components/WatchlistTable';
import { useFetchWatchlist } from './hooks/useFetchWatchlist';

const Watchlist = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { watchlist, isLoadingWatchlist } = useFetchWatchlist({
    enabled: true
});
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
      <WatchlistTable 
        data={watchlist}
        isLoading={isLoadingWatchlist}
      />
      <WatchlistDrawer
        isOpen={drawerOpen}
        handleOpen={setDrawerOpen}
        watchlist={watchlist}
      />
    </div>
  );
};

export default Watchlist;
