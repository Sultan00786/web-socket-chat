import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

const socketArr: WebSocket[] = [];

wss.on("connection", function (socket) {
  console.log("A new client connected");
  socketArr.push(socket);
  // socket.send("heyyyyyyyy !!!");
  socket.on("message", (e) => {
    socketArr.forEach((s) => {
      s.send(e.toString());
    });
  });
});
