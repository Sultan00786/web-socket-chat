import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

const socketArr: WebSocket[] = [];
const roomArr: Map<string, WebSocket[]> = new Map();

wss.on("connection", function (socket) {
  console.log("A new client connected");
  socketArr.push(socket);

  /**
   * 
   * MESSAGE SCHEMA !!!
   * 
   * message = {
   *  "type": "join",
   *  "payload": {
   *    "roomId": "123"
   *  }
   * }
   * 
   * OR 
   * 
   * message = {
   *  "type": "chat",
   *  "payload": {
   *    "message": "Hellow there!" 
   *   }
   * }
   */

  socket.on("message", (e) => {
    const parseMess = JSON.parse(e.toString());
    /**
     * 1. user firstly connect with room using roomId from the massage_payload
     * 
     * 2. after that he/she can able to communicate in that perticular room
     * 
     */
    if(parseMess.type == "join"){
      const roomId = parseMess.payload.roomId;
      if(roomArr.has(roomId)) 
        roomArr.get(roomId)?.push(socket);
      else if(!roomArr.has(roomId))
        roomArr.set(roomId, [socket]);
    }
    else if(parseMess.type == "chat"){
      // todo --> check user socket is prensetn in roomArr

      
    }
  });

  socket.on("disconnect", () => {
    socketArr.filter((s) => s != socket);
  });
});

// Broadcasting logic
// const socketArr: WebSocket[] = [];

// wss.on("connection", function (socket) {
//   console.log("A new client connected");
//   socketArr.push(socket);
//   // socket.send("heyyyyyyyy !!!");
//   socket.on("message", (e) => {
//     socketArr.forEach((s) => {
//       s.send(e.toString());
//     });
//   });

//   socket.on("disconnect", () => {
//     socketArr.filter((s) => s != socket);
//   });
// });
