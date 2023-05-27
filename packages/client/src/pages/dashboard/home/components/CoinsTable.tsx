import { Table } from "antd"
import { CoinTableColumns } from "./CoinTableColumns"
import { useFetchCoins } from "../hooks/useFetchCoins";

const CoinsTable = () => {
    const { coins, isLoadingCoins } = useFetchCoins({
        enabled: true
    });
    return (
        <>
            <Table
                pagination={{
                    pageSize: 10,
                }}
                size="middle"
                style={{ width: '100%' }}
                loading={isLoadingCoins}
                dataSource={coins}
                columns={CoinTableColumns}
            />
        </>
    )
}

export default CoinsTable