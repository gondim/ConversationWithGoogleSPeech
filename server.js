require('dotenv').config({silent: true});

var server = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('rodando na porta: %d', port);
});
