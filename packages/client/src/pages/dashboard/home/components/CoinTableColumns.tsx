import { CoinColumn } from "../../../../types";

export const CoinTableColumns: CoinColumn[] = [
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
    },
    {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        render: (_, record) => (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img style={{
                    marginRight: '4px',
                    borderRadius: '50%',
                }} src={record.imageUrl} alt="Coin" width={42} height={42} />
                <span
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        marginLeft: '8px',
                        flexDirection: 'column'
                    }}
                >
                    <span>{record.name}</span>
                    <span
                        style={{
                            color: "GrayText"
                        }}
                    >{record.symbol}</span>
                </span>
            </div>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Market Cap',
        dataIndex: 'marketCap',
        key: 'marketCap',
    },
    {
        title: 'Change',
        dataIndex: 'change',
        key: 'change',
        render: (value) => {
            if (value.startsWith('+')) {
                return (
                    <span style={{ color: 'green' }}>{value}</span>
                )
            }
            if (value.startsWith('-')) {
                return (
                    <span style={{ color: 'red' }}>{value}</span>
                )
            }
            return (
                <span>{value}</span>
            )
        }
    },
];