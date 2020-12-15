const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;
var cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const generateRandomData = (name, interval) => {
  const date = new Date();

  return {
    stock: name,
    interval: interval,
    time: date.getTime(),
    currentPrice: Math.floor(Math.random() * Math.floor(100)),
    yOpen: Math.floor(Math.random() * Math.floor(100)),
    yClose: Math.floor(Math.random() * Math.floor(100)),
    unitsSold: Math.floor(Math.random() * Math.floor(100)),
    unitsPurchased: Math.floor(Math.random() * Math.floor(100)),
    yLow: Math.floor(Math.random() * Math.floor(100)),
    yHigh: Math.floor(Math.random() * Math.floor(100)),
  };
};

const openSockets = [
  { socketName: "DFZ Incorporated", interval: 1000 },
  { socketName: "Bitcoin Corporation", interval: 2500 },
];

app.get("/", (req, res, next) => {
  res.send(JSON.stringify(openSockets));
});

app.post("/create", (req, res, next) => {
  if (!req.body) res.send("No Body m8");
  if (req.body.socketName && req.body.interval) {
    const { socketName, interval } = req.body;
    openSockets.push({ socketName, interval });
    console.log("added socket", socketName, "with duration:", interval);
  } else {
    console.log(req.body);
    res.send("no");
  }
});

const sendSocketData = (s, d) => {
  const p = generateRandomData(d.socketName, d.interval);
  s.emit(d.socketName, p);
};

io.on("connection", (socket) => {
  console.log("New client connected");

  openSockets.map((sock) => {
    return setInterval(() => sendSocketData(socket, sock), sock.interval);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("createSocket", () => {
    console.log("Handling createSocket request");
    socket.emit("getNewSocketList", JSON.stringify(openSockets));
  });

  socket.on("error", (error) => {
    console.log(error);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
