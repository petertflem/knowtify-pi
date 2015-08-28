var WebSocket = require('ws');
var loggy = require('../git_submodules/loggy');
var keepAlive = true;
var host = 'ws://routing-hub.herokuapp.com';
var openSerialPort;

module.exports.initialize = function(serialPort) {
  loggy.info('Initializing web socket...');

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
  loggy.info('Data recieved from Heroku: ' + data);
  openSerialPort.write(JSON.parse(data)['error-code']);
}

function open() {
  loggy.info('connected to the server');
}

function close() {
  loggy.info('connection closed by the server');
}

//If no server running, try new connection every x seconds?
