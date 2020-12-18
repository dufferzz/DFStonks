import React from "react";
import io from "socket.io-client";
// import ReconnectingWebSocket from "reconnecting-websocket";

export const socket = io("socket.dufferz.net");
// const rws = new ReconnectingWebSocket("wss://localhost:4001/ws");

// rws.addEventListener("open", () => {
//   rws.send("hello!");
// });
const SocketContext = React.createContext(socket);

export default SocketContext;
