const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //parseo del body y lectura
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}
