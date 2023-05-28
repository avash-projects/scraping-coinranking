import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';
import { notify } from '../../../shared/Notification';

export const useFetchCoins = ({
    enabled,
}: { enabled?: boolean | undefined }) => {
    const { data, isLoading: isLoadingCoins } = useQuery({
        queryKey: ['coins'],
        queryFn: async () => (await axiosInstance.get('/coin/all')).data,
        enabled: enabled,
        onError: () => {
            notify("Error fetching coin list.", 'error', 'top-right')
        }
    });
    return { coins: data?.data, isLoadingCoins };
};