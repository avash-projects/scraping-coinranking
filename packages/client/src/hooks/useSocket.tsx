// import { useEffect } from "react"
// import useStore from "../store";
// import { io } from "socket.io-client"

// const useSocket = () => {
//     // const socket = useStore((state) => state.socket);
//     const setSocket = useStore((state) => state.setSocket);
//     useEffect(() => {
//         const conn = io("ws://localhost:3030")
//         setSocket(conn)
//     }, [setSocket]);
//     // return socket;
// }

// export default useSocket;