import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notify } from "../../../pages/shared/Notification";
import axiosInstance from "../../../libs/axios";

const markAllRead = async () => {
  return await axiosInstance.post("/notification/mark-all-read");
}

export const useMarkAllRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
      queryClient.invalidateQueries({ queryKey: ['all-notification'] });
      notify("Success.", 'success', 'top-right');
    },
    onError: () => {
      notify("Error.", 'error', 'top-right')
    }
  })
} 