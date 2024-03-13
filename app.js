const express = require("express");
const { Server } = require("socket.io");

const app = express();

// Create an HTTP server using Express
const server = app.listen(5000, () => {
  console.log("SERVER RUNNING");
});
// Attach Socket.IO to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "https://chat-frontend-7r5i.onrender.com",
    methods: ["GET", "POST"],
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => { 
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    // console.log(room)
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", (messageData) => {
    // console.log(messageData)
    socket.to(messageData.room).emit("receive_message", messageData);
  });

  socket.on("disconnect", (socket) => {
    console.log("User Disconnected",
    socket.id);
  });
});
