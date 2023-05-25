import { create } from "zustand";
import ioClient, { Socket } from "socket.io-client";

interface Store {
  socket: Socket | null;
  isScraping: boolean;
  setSocket: () => void;
  updateScrapingStatus: (value: boolean) => void;
}

const useStore = create<Store>((set) => ({
  socket: null,
  isScraping: false,
  setSocket: () => {
    set(() => ({ socket: ioClient("http://localhost:3030") }));
  },
  updateScrapingStatus: (value: boolean) => set(() => ({ isScraping: value })),
}));

export default useStore;
