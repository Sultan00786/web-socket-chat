import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  console.log("A new client connected");
  // socket.send("heyyyyyyyy !!!");
  socket.on("message", (e) => {
    if (e.toString() === "ping") {
      socket.send("pong");
    }
  });
});
