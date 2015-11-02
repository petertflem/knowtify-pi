// Configure the logger
/*require('../git_submodules/loggy').initialize({
  targetLoggingModules: [{
    name: 'httppost',
    settings: {
      http: {
        targetHostname: 'knowtify-web-app.herokuapp.com',
        targetPort: '80',
        targetPath: '/api/logs'
      }
    }
  }]
});*/

require('./websocket').initialize();

/*
require('./serialport').initialize(function (serialPort){
  require('./websocket').initialize(serialPort);
});
*/

//require('./websocket0').initialize();
