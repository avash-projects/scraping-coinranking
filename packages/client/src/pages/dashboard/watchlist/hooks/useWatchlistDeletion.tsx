import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../../../libs/axios"
import { notify } from "../../../shared/Notification"

const deleteFromWatchList = async (symbol: string) => {
  return await axiosInstance.delete(`/watchlist/${symbol}`)
}

export const useWatchlistDeletion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (symbol: string) => deleteFromWatchList(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] })
      notify("Deleted watchlist item.", 'success', 'top-right');
    },
    onError: () => {
      notify("Error deleting item.", 'error', 'top-right');
    }
  })
} 