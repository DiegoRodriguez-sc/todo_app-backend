const User = require("../models/user");

const idUserExists = async (id) => {
  const userDB = await User.findById(id);
  if (!userDB) {
    throw new Error(`El usuario con id: ${id} no existe `);
  }
};

module.exports = {
  idUserExists,
};
