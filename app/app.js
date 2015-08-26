/*require('./serialport').initialize(function (serialPort){
  require('./websocket').initialize(serialPort);
});*/
// Configure the logger
require('../git_submodules/loggy').initialize({
  targetLoggingModules: [{ name: 'httppost' }]
});

require('./websocket0').initialize();
