const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  setInterval(() => getApiAndEmit(socket), 500); // 1 per 500ms
  setInterval(() => getApiAndEmit2(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();

  const data = {
    stock: "DFZ Inc",
    time: response.getTime(),
    currentPrice: Math.floor(Math.random() * Math.floor(100)),
    yOpen: Math.floor(Math.random() * Math.floor(100)),
    yClose: Math.floor(Math.random() * Math.floor(100)),
    unitsSold: Math.floor(Math.random() * Math.floor(100)),
    unitsPurchased: Math.floor(Math.random() * Math.floor(100)),
    yLow: Math.floor(Math.random() * Math.floor(100)),
    yHigh: Math.floor(Math.random() * Math.floor(100)),
  };

  socket.emit("SocketRandom", data);
};

const getApiAndEmit2 = (socket) => {
  const response = new Date();

  const data = {
    stock: "Bitcoin Corp",
    time: response.getTime(),
    currentPrice: Math.floor(Math.random() * Math.floor(100)),
    yOpen: Math.floor(Math.random() * Math.floor(100)),
    yClose: Math.floor(Math.random() * Math.floor(100)),
    unitsSold: Math.floor(Math.random() * Math.floor(100)),
    unitsPurchased: Math.floor(Math.random() * Math.floor(100)),
    yLow: Math.floor(Math.random() * Math.floor(100)),
    yHigh: Math.floor(Math.random() * Math.floor(100)),
  };

  socket.emit("SocketRandom2", data);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
