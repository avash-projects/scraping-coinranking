import { create } from "zustand";
import { Socket, io } from "socket.io-client";

interface Store {
  socket: Socket | null;
  isScraping: boolean;
  updateScrapingStatus: (value: boolean) => void;
}

const useStore = create<Store>((set) => ({
  socket: io("ws://localhost:3030", {
    autoConnect: false,
  }),
  isScraping: false,
  updateScrapingStatus: (value: boolean) => set(() => ({ isScraping: value })),
}));

export default useStore;
