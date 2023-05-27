import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../../../libs/axios"
import { Watchlist } from "../../../../types"
import { notify } from "../../../shared/Notification"

const addToWatchList = async (data: Watchlist) => {
  return await axiosInstance.post("/watchlist", data)
}

export const useWatchlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Watchlist) => addToWatchList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      notify("Successfully added item.", 'success', 'top-right');
    },
    onError: () => {
      notify("Error adding item.", 'error', 'top-right')
    }
  })
} 