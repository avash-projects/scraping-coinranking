import { useQuery } from '@tanstack/react-query';
import { notify } from '../../../pages/shared/Notification';
import axiosInstance from '../../../libs/axios';

export const useFetchHistory = () => {
    const { data, isLoading: isLoadingHistory } = useQuery({
        queryKey: ['history'],
        queryFn: async () => (await axiosInstance.get('/history/latest')).data,
        onError: () => {
            notify("Error fetching history.", 'error', 'top-right')
        }
    });

    return { history: data?.data, isLoadingHistory };
};