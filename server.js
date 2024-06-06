const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let connectedUsers = 0; // Initialize the counter

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Increment the counter when a new user connects
  connectedUsers++;
  
  // Emit the updated user count to all clients
  io.emit('userCount', connectedUsers);

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    
    // Decrement the counter when a user disconnects
    connectedUsers--;
    
    // Emit the updated user count to all clients
    io.emit('userCount', connectedUsers);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
