const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const loginAuth = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/auth/login",
    });
  }
};

//registro de usuario
const registerAuth = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  try {
    //validación de usuario existente
    const userDB = await User.findOne({ email });
    if (userDB) {
      return res.status(400).json({
        error: 400,
        msg: "usuario ya existe",
        path: "/api/auth/register",
      });
    }

    const newUser = new User({ name, email, password });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);

    await newUser.save();

    res.status(201).json({
      error: false,
      msg: "Usuario registrado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/auth/register",
    });
  }
};

module.exports = {
  loginAuth,
  registerAuth,
};
