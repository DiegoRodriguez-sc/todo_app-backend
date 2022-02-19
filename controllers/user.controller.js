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

module.exports = {
  getUsers,
  getUserById,
};
