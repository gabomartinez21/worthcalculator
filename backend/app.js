require('dotenv').config();
var ServerApp = require('./models/server');
var server = new ServerApp();
server.listen();
