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

const Sockets = [
  { socketName: "DFZ Incorporated", interval: 500 },
  { socketName: "Bitcoin Corporation", interval: 1000 },
];

app.get("/", (req, res, next) => {
  res.send(JSON.stringify(Sockets));
});

app.post("/create", (req, res, next) => {
  if (!req.body) res.send("No Body m8");
  if (req.body.socketName && req.body.interval) {
    const { socketName, interval } = req.body;
    console.log(socketName, interval);
    Sockets.push({ socketName, interval });
    console.log("added socket", socketName, "with duration:", interval);
  }

  res.send(JSON.stringify(Sockets));
});

const sendSocketData = (socket, data) => {
  const payload = generateRandomData(data.socketName, data.interval);
  socket.emit(data.socketName, payload);
};

io.on("connection", (socket) => {
  console.log("New client connected");

  for (let i = 0; i < Sockets.length; i++) {
    setInterval(() => sendSocketData(socket, Sockets[i]), Sockets[i].interval); // 1 per 500ms
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
