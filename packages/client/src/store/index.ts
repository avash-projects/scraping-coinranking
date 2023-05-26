import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { APP_CONSTANTS } from "../constants";

interface Store {
  socket: Socket | null;
  isScraping: boolean;
  updateScrapingStatus: (value: boolean) => void;
}

const useStore = create<Store>((set) => ({
  socket: io(APP_CONSTANTS.WS_URL, {
    autoConnect: false,
  }),
  isScraping: false,
  updateScrapingStatus: (value: boolean) => set(() => ({ isScraping: value })),
}));

export default useStore;
