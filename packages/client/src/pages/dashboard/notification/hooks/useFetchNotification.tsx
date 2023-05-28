import { useQuery } from '@tanstack/react-query';
import { notify } from '../../../shared/Notification';
import axiosInstance from '../../../../libs/axios';

export const useFetchNotification = () => {
    const { data, isLoading: isLoadingNotification } = useQuery({
        queryKey: ['all-notification'],
        queryFn: async () => (await axiosInstance.get('/notification/all')).data,
        onError: () => {
            notify("Error fetching notification.", 'error', 'top-right')
        }
    });

    return { notification: data, isLoadingNotification };
};