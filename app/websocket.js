var WebSocket = require('ws');
var keepAlive = true;
var host = 'ws://routing-hub.herokuapp.com';
//var host = 'ws://localhost:5000';
var openSerialPort;

module.exports.initialize = function(serialPort) {
  var ws = new WebSocket(host);
  var pingId;

  openSerialPort = serialPort;

  ws.on('message', message);

  ws.on('open', function () {
    if (keepAlive)
      pingId = setInterval(function () { ws.ping(); }, 45000);
    open();
  });

  ws.on('close', function () {
    keepAlive && clearInterval(pingId);
    close();
  });
}

function message(data, flags) {
  console.log('Data recieved from Heroku: ' + data);
  openSerialPort.write(JSON.parse(data)['error-code']);
}

function open() {
  console.log('connected to the server');
}

function close() {
  console.log('connection closed by the server');
}

//If no server running, try new connection every x seconds?
