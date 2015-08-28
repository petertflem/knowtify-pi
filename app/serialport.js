var loggy = require('../git_submodules/loggy');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var openSerialPort;
var fnSerialOpen;

module.exports.initialize = function (serialOpenCallback) {
  loggy.info('Initializing serial port...');

  fnSerialOpen = serialOpenCallback;

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
  loggy.info('Port open. Data rate: ' + openSerialPort.options.baudRate);
  fnSerialOpen(openSerialPort);
}

function data (data) {
  loggy.info(data);
}

function close() {
  loggy.info('Serial port closed');
}

function error (error) {
  loggy.info('Serial port error: ' + error);
}
