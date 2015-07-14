var WebSocket = require('ws');

//var host = 'ws://routing-hub.herokuapp.com';
var host = 'ws://localhost:5000';
var pingId;
var ws = new WebSocket(host);

ws.on('message', function open(data, flags) {
  console.log(data);
});

ws.on('open', function () {
  pingId = setInterval(function () { ws.ping(); }, 45000);
});

ws.on('close', function () {
  clearInterval(pingId);
  console.log('connection closed by the server');
});

ws.on('pong', function () {
  console.log('pong');
});
