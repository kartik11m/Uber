import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContextData = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            transports: ["websocket"],
            autoConnect: true,
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("User connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        // return () => {
        //     newSocket.disconnect();
        // };
    }, []);

    // Send a message to a specific event
    // const sendMessage = (eventName, data) => {
    //     if (socket) {
    //         // console.log(`Sending Message: ${data} to ${eventName}`);
    //         socket.emit(eventName, data);
    //     }
    // };

    // Listen for messages from a specific event
    // const receiveMessage = (eventName, callback) => {
    //     if (socket) {
    //         socket.on(eventName, callback);
    //     }
    // };

    return (
        <SocketContextData.Provider value={{ socket }}>
            {children}
        </SocketContextData.Provider>
    );
};

export default SocketProvider;