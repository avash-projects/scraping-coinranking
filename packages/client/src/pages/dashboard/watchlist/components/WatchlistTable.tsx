import { Table } from "antd"
import { Watchlist } from "../../../../types";
import { useWatchlistDeletion } from "../hooks/useWatchlistDeletion";
import getWatchlistColumns from "./WatchlistColumns";

interface WatchlistProps {
    data: Watchlist[],
    isLoading: boolean
}

const WatchlistTable = ({ data, isLoading }: WatchlistProps) => {
    const deleteMutation = useWatchlistDeletion();

    const handleDelete = (record: Watchlist) => {
        deleteMutation.mutate(record?.symbol);
    }
    const watchlistColumns = getWatchlistColumns({ handleDelete });
    return (
        <>
            <Table
                pagination={{
                    pageSize: 10,
                }}
                size="middle"
                style={{ width: '100%' }}
                loading={isLoading}
                dataSource={data}
                columns={watchlistColumns}
            />
        </>
    )
}

export default WatchlistTable