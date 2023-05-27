import { Button, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import { useFetchCoins } from '../../home/hooks/useFetchCoins';
import { Coin, Watchlist } from '../../../../types';
import { useWatchlistMutation } from '../hooks/useWatchlistMutation';

interface DrawerProps {
  isOpen: boolean;
  handleOpen: (val: boolean) => void;
  watchlist: Watchlist[];
}

const WatchlistDrawer = (
  props: DrawerProps
) => {
  const { isOpen, handleOpen, watchlist } = props
  const [form] = Form.useForm();
  const { coins, isLoadingCoins } = useFetchCoins({
    enabled: isOpen
  });
  const watchlistMutation = useWatchlistMutation();
  const selectOptions = coins?.filter(({ symbol: d1 }: Watchlist) => !watchlist.some(({ symbol: d2 }) => d1 === d2));
  const validatePositiveNumber = (_: any, value: number, callback: (error?: string) => void) => {
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue < 0) {
      return new Promise((_, reject) => reject('Value cannot be smaller than zero'));
    }
    return new Promise((resolve) => resolve('Pass'))
  };

  const handleFinish = (data: Watchlist) => {
    watchlistMutation.mutate(data);
    handleOpen(false);
    form.resetFields();
  }

  return (
    <Drawer
      width={600}
      height={100}
      title="Add to watchlist"
      placement="right"
      onClose={() => handleOpen(false)}
      open={isOpen}
    >
      <Spin spinning={isLoadingCoins}>
        <Form
          form={form}
          name="watchlistForm"
          onFinish={(values) => {
            handleFinish(values);
          }}
        >
          <Form.Item
            label="Coin"
            name="symbol"
            rules={[{ required: true, message: 'Please select a coin.' }]}
          >
            <Select
              showSearch
              placeholder="Select a coin"
            >
              {selectOptions?.map((coin: Coin) => (
                <Select.Option key={coin.symbol} value={coin.symbol}>
                  {coin.symbol}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Minimum Price"
            name="min_price"
            rules={[{ required: true, validator: validatePositiveNumber, message: 'Price must be zero or more.' }]}
          >
            <Input
              placeholder='Enter minimum price.'
              type='number'
            />
          </Form.Item>
          <Form.Item
            style={{
              width: '100%'
            }}
            label="Maximum Price"
            name="max_price"
            rules={[{ required: true, validator: validatePositiveNumber, message: 'Price must be zero or more.' }]}
          >
            <Input
              placeholder='Enter maximum price.'
              type='number'
            />
          </Form.Item>
          <Row>
            <Space>
              <Button onClick={() => handleOpen(false)}>Cancel</Button>
              <Button loading={watchlistMutation.isLoading} htmlType="submit" type="primary">
                Save
              </Button>
            </Space>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default WatchlistDrawer;
