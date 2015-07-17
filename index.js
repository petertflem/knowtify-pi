var WebSocket = require('ws');

/*
 * If no server running, try new connection every x seconds?
 */

/*var host = 'ws://routing-hub.herokuapp.com';
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
*/

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var sp = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600/*,
  parser: serialport.parsers.readline('\r\n')*/
});

sp.on('open', showPortOpen);
sp.on('data', saveLatestData);
sp.on('close', showPortClose);
sp.on('error', showError);

function showPortOpen() {
  console.log('Port open. Data rate: ' + sp.options.baudRate);
  setInterval(function () { sp.write('Hey there!'); }, 5000);
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
