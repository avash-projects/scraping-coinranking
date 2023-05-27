import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';
import { notify } from '../../../shared/Notification';

export const useFetchWatchlist = ({
    enabled
}: { enabled: boolean | undefined }) => {
    const { data, isLoading: isLoadingWatchlist } = useQuery({
        queryKey: ['watchlist'],
        queryFn: async () => (await axiosInstance.get('/watchlist/all')).data,
        enabled: enabled,
        onError: () => {
            notify("Error fetching watchlist.", 'error', 'top-right')
        }
    });

    return { watchlist: data?.data, isLoadingWatchlist };
};