require('./serialport').initialize(function (serialPort){
  require('./websocket').initialize(serialPort);
});
