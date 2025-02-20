import { io, Socket } from "socket.io-client";
import config from "@/config.json"
const SOCKET_URL = `${config.server_base_url}:${config.server_port}`; 

let socket: Socket;

export const connectSocket = (userEmail: string) => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        
        console.log('connectSocket triggered'); 
        socket.connect();
        
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
            socket.emit("join", { email: userEmail });
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        socket.on("reconnect", (attemptNumber) => {
            console.log("Socket reconnected after", attemptNumber, "attempts");
            socket.emit("join", { email: userEmail });
        });

        socket.on("reconnect_error", (error) => {
            console.error("Socket reconnection error:", error);
        });

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

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null as any;
    }
};

export const getSocket = () => socket;

export const isSocketConnected = () => {
    return socket && socket.connected;
};

export const emitEvent = (eventName: string, data: any) => {
    if (socket && socket.connected) {
        socket.emit(eventName, data);
    } else {
        console.error('Socket is not connected. Cannot emit event:', eventName);
    }
};