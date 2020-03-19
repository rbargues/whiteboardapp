const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "./")));

io.on("connection", socket => {
  socket.on("position", data => {
    socket.broadcast.emit("update", data);
  })
})

app.get("/", (req, res) => {
  return res.status(200).sendFile("./index.html")
})

http.listen(3000);