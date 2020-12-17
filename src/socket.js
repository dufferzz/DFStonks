import React from "react";
import io from "socket.io-client";

export const socket = io("localhost:4001");

const SocketContext = React.createContext(socket);

export default SocketContext;
