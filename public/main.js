// public/main.js
const socket = io();
const countElement = document.getElementById('count');

socket.on('userCount', (count) => {
  countElement.textContent = count;
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messages = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.emit('message', message);
  messageInput.value = '';
});

socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messages.appendChild(messageElement);
});
