const { request, response } = require("express");

const getUserById = async (req = request, res = response) => {
  res.json({ msg: "Hola" });
};

module.exports = {
  getUserById,
};
