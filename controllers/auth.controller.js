const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../security/generarJWT");

//logeo de usuario
const loginAuth = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });
    //email incorrecto
    if (!userDB) {
      return res.status(400).json({
        error: 400,
        msg: "Usuario/Contraseña incorrectos",
        path: "/api/auth/login",
      });
    }
    //usuario borrado
    if (userDB.state === false) {
      return res.status(400).json({
        error: 400,
        msg: "Usuario/Contraseña incorrectos",
        path: "/api/auth/login",
      });
    }
    //contraseña inconrrecta
    const validatePassword = bcryptjs.compareSync(password, userDB.password);
    if (!validatePassword) {
      return res.status(400).json({
        error: 400,
        msg: "Usuario/Contraseña incorrectos",
        path: "/api/auth/login",
      });
    }
    //todo okey generamos token
    const token =await generarJWT(userDB._id);
    res.status(200).json({
      error: false,
      msg: "Login ok",
      data: {
        token,
        user: userDB,
      },
    });
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
      msg: "Usuario registrado con éxito",
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
