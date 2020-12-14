import React from "react";
import io from "socket.io-client";

export const socket = io("192.168.1.47:4001");

const SocketContext = React.createContext(socket);

export default SocketContext;
