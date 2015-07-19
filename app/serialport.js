var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var openSerialPort;

module.exports.initialize = function (fnSerialOpen) {
  openSerialPort = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: serialport.parsers.readline('\r\n')
  });

  openSerialPort.on('open', open);
  openSerialPort.on('data', data);
  openSerialPort.on('close', close);
  openSerialPort.on('error', error);
}

module.exports.write = function(data) {
  openSerialPort.write(data);
}

function open () {
  console.log('Port open. Data rate: ' + openSerialPort.options.baudRate);
  fnSerialOpen(openSerialPort);
}

function data (data) {
  console.log(data);
}

function close() {
  console.log('Serial port closed');
}

function error (error) {
  console.log('Serial port error: ' + error);
}
