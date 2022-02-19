const { request, response } = require("express");
const User = require("../models/user");

//Get all users
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

const getUserById = async (req = request, res = response) => {
  res.json({ msg: "Hola" });
};

module.exports = {
  getUsers,
  getUserById,
};
