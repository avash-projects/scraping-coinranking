import { useQuery } from '@tanstack/react-query';
import { notify } from '../../../pages/shared/Notification';
import axiosInstance from '../../../libs/axios';

export const useFetchNotification = () => {
    const { data, isLoading: isLoadingNotification } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => (await axiosInstance.get('/notification/all')).data,
        onError: () => {
            notify("Error fetching notification.", 'error', 'top-right')
        }
    });

    return { notification: data, isLoadingNotification };
};