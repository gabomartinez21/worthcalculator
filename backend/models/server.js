const express = require('express')
const cors = require('cors')

class ServerApp{

  constructor(){
    this.app = express()
    this.port = process.env.PORT || 5000;

    this.middelwares()
    this.routes();
  }

  middelwares(){
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use('/', require('../routes/calculator'));
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto',this.port);
    })
  }
}

module.exports = ServerApp
