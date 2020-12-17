const express = require("express");
const http = require("http");
const port = process.env.PORT || 4001;
const cors = require("cors");
const d3 = require("d3");
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

const randomOne = (weight = 1) => {
  return (Math.random() + Math.random() - 1) * weight;
};

const generateData = () => {
  const length = Math.round(Math.random() * 90) + 10;
  const date = new Date();

  // initial values
  const seed_close = Math.random() * 150 + 50;
  let previous_close = seed_close;
  let previous_volume = Math.random() * 300 + 10;
  let trend = Math.floor(Math.random() * 2) * 2 - 1;

  // calculate each bar
  return d3.range(length).map((item, i) => {
    const open = previous_close * (1 + randomOne(0.1));
    const close = open * (1 + randomOne(0.2) * trend);
    const high = Math.max(open, close) * (1 + randomOne(0.1));
    const low = Math.min(open, close) * (1 - randomOne(0.1));
    const volume = previous_volume * (1 + randomOne(0.5));

    previous_close = close;
    trend = Math.floor(Math.random() * 2) * 2 - 1;

    return {
      time: date.getTime() + i,
      open,
      high,
      low,
      close,
      volume,
    };
  });
};

// console.log(generateData());

const generateRandomData = (name, interval) => {
  const date = new Date();

  return {
    interval: interval,
    time: date.getTime(),
    yOpen: Math.floor(Math.random() * Math.floor(100)),
    yClose: Math.floor(Math.random() * Math.floor(100)),
    yLow: Math.floor(Math.random() * Math.floor(100)),
    yHigh: Math.floor(Math.random() * Math.floor(100)),
    stock: name,
  };
};

const openSockets = [
  { socketName: "DFZ Incorporated", interval: 250 },
  { socketName: "HireMe Ltd", interval: 1000 },
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

const sendSocketData = (sock, d) => {
  const payload = generateRandomData(d.socketName, d.interval);
  sock.emit(d.socketName, payload);
};

io.on("connection", (socket) => {
  console.log("New client connected");

  openSockets.map((sock) => {
    return setInterval(() => sendSocketData(socket, sock), sock.interval);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // socket.on("createSocket", () => {
  //   console.log("Handling createSocket request");
  //   socket.emit("getNewSocketList", JSON.stringify(openSockets));
  // });

  socket.on("error", (error) => {
    console.log(error);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
