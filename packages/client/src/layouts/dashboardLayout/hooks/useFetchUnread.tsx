import { useQuery } from '@tanstack/react-query';
import { notify } from '../../../pages/shared/Notification';
import axiosInstance from '../../../libs/axios';

export const useFetchUnread = () => {
    const { data, isLoading: isLoadingNotification } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => (await axiosInstance.get('/notification/unread')).data,
        onError: () => {
            notify("Error fetching notification.", 'error', 'top-right')
        }
    });

    return { notifications: data?.data?.notifications, unreadCount: data?.data?.unreadCount, isLoadingNotification };
};