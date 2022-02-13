// Make connection
const socket = io.connect('http://localhost:8000');

// Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.getElementById('feedback');


// EMIT Events
btn.addEventListener('click', function() {
   socket.emit('chat', {
      message: message.value,
      handle: handle.value
   });

   message.value = "";
})

message.addEventListener('keypress', () => {
   socket.emit('typing', handle.value)
})


// LISTEN for events
socket.on('chat', function(data) {
   feedback.innerHTML = "";
   output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
})

socket.on('typing', (data) => {
   feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
})