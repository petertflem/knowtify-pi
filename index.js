var WebSocket = require('ws');
var SerialPort = require('serialport').SerialPort;

/*
 * If no server running, try new connection every x seconds?
 */

var host = 'ws://routing-hub.herokuapp.com';
//var host = 'ws://localhost:5000';
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

var serialport = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  serialPort.write("Hello", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});
