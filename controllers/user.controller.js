const { request, response } = require("express");
const User = require("../models/user");

//Obtener todos los usuarios
const getUsers = async (req = request, res = response) => {
  try {
    const usersDB = await User.find({ state: true });
    const contUsers = await User.countDocuments({ state: true });
    res.status(200).json({
      error: false,
      total: contUsers,
      users: usersDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/user",
    });
  }
};

//Obtener usuario por id
const getUserById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const userDB = await User.findById(id);
    res.status(200).json({
      error: false,
      user: userDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/user",
    });
  }
};

//Actualizar usuario , solo con token y tiene que ser el mismo usuario
const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, ...userBody } = req.body;
  try {
    if (id != req.user._id) {
      return res.status(401).json({
        error: 401,
        msg: "Usuario no autorizado",
      });
    }
    const userUpdated = await User.findByIdAndUpdate(id, userBody, {
      new: true,
    });
    res.status(200).json({
      error: false,
      msg: "Usuario actualizado",
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/user",
    });
  }
};


module.exports = {
  getUsers,
  getUserById,
  putUser,
};
