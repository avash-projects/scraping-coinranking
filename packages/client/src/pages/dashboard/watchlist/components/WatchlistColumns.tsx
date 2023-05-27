import { ColumnType } from 'antd/lib/table';
import { Watchlist } from '../../../../types';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal

interface WatchlistColumnsProps {
  handleDelete: (record: Watchlist) => void;
}

const getWatchlistColumns = ({ handleDelete }: WatchlistColumnsProps): ColumnType<Watchlist>[] => {
  const showDeleteConfirmation = (record: Watchlist) => {
    return (
      confirm({
        title: 'Are you sure you want to delete this item?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleDelete(record)
        },
      })
    )
  };

  return [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Min Price',
      dataIndex: 'min_price',
      key: 'min_price',
    },
    {
      title: 'Max Price',
      dataIndex: 'max_price',
      key: 'max_price',
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" danger onClick={() => showDeleteConfirmation(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];
}

export default getWatchlistColumns;

