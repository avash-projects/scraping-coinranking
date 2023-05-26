import { Table } from "antd"
import { coinTableColumns } from "./CoinTableColumns"
import { useFetchCoins } from "../hooks/useFetchCoins";

const CoinsTable = () => {
    const { coins, isLoadingCoins } = useFetchCoins();
    return (
        <>
            <Table
                pagination={{
                    pageSize: 9,
                }}
                size="middle"
                style={{ width: '100%' }}
                loading={isLoadingCoins}
                dataSource={coins}
                columns={coinTableColumns}
            />
        </>
    )
}

export default CoinsTable