var WebSocket = require('ws');
var host = 'ws://routing-hub.herokuapp.com';
//var host = 'ws://localhost:5000';
var pingId;
var ws = new WebSocket(host);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

//If no server running, try new connection every x seconds?

initializeWebSocket();

/*
{
  "error-code": 1
}
*/

function initializeWebSocket() {
  ws.on('message', function open(data, flags) {
    console.log('Data recieved from Heroku: ' + data);
    writeToSerialPort(data['error-code']);
  });

  ws.on('open', function () {
    pingId = setInterval(function () { ws.ping(); }, 45000);
  });

  ws.on('close', function () {
    clearInterval(pingId);
    console.log('connection closed by the server');
  });
}

var sp = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline('\r\n')
});

sp.on('open', showPortOpen);
sp.on('data', saveLatestData);
sp.on('close', showPortClose);
sp.on('error', showError);


function writeToSerialPort(data) {
  sp.write(data);
}

function showPortOpen() {
  console.log('Port open. Data rate: ' + sp.options.baudRate);
}

function saveLatestData(data) {
  console.log(data);
}

function showPortClose() {
  console.log('Port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}
