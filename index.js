var WebSocket = require('ws');

//var host = 'ws://routing-hub.herokuapp.com';
var host = 'ws://localhost:5000';

var ws = new WebSocket(host);

ws.on('message', function open(data, flags) {
  console.log(data);
});
