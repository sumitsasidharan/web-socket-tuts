const express = require('express');
const socket = require('socket.io');
const path = require('path');


// App setup
const PORT = 8000;
const app = express();
const server = app.listen(PORT, () => {
   console.log('listening to requests on port ' + PORT);
})

// Static files
// app.use(express.static('pubic'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/images'))


// Socket setup
const io = socket(server)

io.on('connection', function(socket) {
   console.log('made socket connection', socket.id)

   // Handle Chat event
   socket.on('chat', function(data) {
      io.sockets.emit('chat', data);
   })

   // broadcast to everyone except the original sender
   socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
   })
})