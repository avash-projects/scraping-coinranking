import { Table } from "antd"
import { useFetchWatchlist } from "../hooks/useFetchWatchlist";
import { Watchlist } from "../../../../types";
import { useWatchlistDeletion } from "../hooks/useWatchlistDeletion";
import getWatchlistColumns from "./WatchlistColumns";

const WatchlistTable = () => {
    const deleteMutation = useWatchlistDeletion();
    const { watchlist, isLoadingWatchlist } = useFetchWatchlist({
        enabled: true
    });
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
                loading={isLoadingWatchlist}
                dataSource={watchlist}
                columns={watchlistColumns}
            />
        </>
    )
}

export default WatchlistTable