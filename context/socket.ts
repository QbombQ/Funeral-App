import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://172.20.100.19:8000"; 

let socket: Socket;

export const connectSocket = (userEmail: string) => {
    
    if (!socket) {
        socket = io(SOCKET_URL);
        console.log('connectSocket triggered'); 
        socket.connect();
        
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
            socket.emit("join", { email: userEmail });
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        // Example of listening to notifications
        socket.on("shared-checkList", (data) => {
            console.log("Received shared checklist notification:", data);
        });

        socket.on("unshared-checkList", (data) => {
            console.log("Received unshared checklist notification:", data);
        });

        socket.on("shared-vault", (data) => {
            console.log("Received shared vault notification:", data);
        });

        socket.on("unshared-vault", (data) => {
            console.log("Received unshared vault notification:", data);
        });
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null as any;
    }
};

export const getSocket = () => socket;
