const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      user: "/api/user",
    };
    //database
    this.connectionDB();
    //middlewares
    this.middlewares();
    //routes
    this.routes();
  }
  //DB Connection
  async connectionDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //parseo del body y lectura
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.path.user, require("../routes/user.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = Server;