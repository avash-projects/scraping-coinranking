export interface Coin {
    rank: string;
    name: string;
    symbol: string;
    price: string;
    marketCap: string;
    change: string;
    imageUrl: string;
}

export interface CoinColumn {
    title: string;
    dataIndex: string;
    key: string;
    render?: (text: string, record: Coin) => React.ReactNode;
}

export interface Watchlist {
  symbol: string;
  min_price: number;
  max_price: number;
  handleDelete: (record: Watchlist) => void;
}

export interface NotificationItem{
  message: string;
  createdAt: string;
}

export interface NotificationColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: NotificationItem) => React.ReactNode;
}
