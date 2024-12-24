const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const scoketio = require("socket.io");
const server = http.createServer(app);
const io = scoketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

server.listen(3000, () => {
  console.log("app is listening to the port 3000");
});
