import { io, Socket } from "socket.io-client";


export let socket: Socket;

export function connectToSocket(): Promise<Socket> {
    socket = io(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_DOMAIN}`);
    return new Promise((resolve, reject) => {
        socket.on("connect", () => {
            console.log("Connected to socket");
            resolve(socket);
        });
    })
}

export function disconnectFromSocket(): void {
    socket.on("disconnect", () => {
        console.log("Disconnected from socket");
    });
}

export function sendToSocket(to: string, data: any, roomId?: string) {
    return socket.emit(`${to}`, data);
}

export function listenToSocket(to = process.env.NEXT_PUBLIC_REACT_APP_SOCKET_EVENT_NAME): Promise<any> {
    return new Promise((resolve, reject) => {
        socket.on(`${to}`, (data: any) => {
            resolve(data?.data)
        });
    })
}

function handleListenMessage(data: any): void {
    console.log(data);
}