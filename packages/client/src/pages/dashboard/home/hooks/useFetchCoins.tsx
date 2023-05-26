import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

export const useFetchCoins = () => {
    const { data, isLoading: isLoadingCoins } = useQuery({
        queryKey: ['coins'],
        queryFn: async () => (await axiosInstance.get('/coin/all')).data,
    });

    return { coins: data?.data, isLoadingCoins };
};