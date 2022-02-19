const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      error: 400,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(401).json({
        error: 401,
        msg: "Usuario no encontrado/ Token no válido",
      });
    }
    if (userDB.state === false) {
      return res.status(401).json({
        error: 401,
        msg: "Token no válido",
      });
    }
    req.user = userDB;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 401,
      msg: "Token no válido",
    });
  }
};

module.exports = validateJWT;