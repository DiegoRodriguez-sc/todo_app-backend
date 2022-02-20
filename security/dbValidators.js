const Todo = require("../models/todo");
const User = require("../models/user");

const idUserExists = async (id) => {
  const userDB = await User.findById(id);
  if (!userDB) {
    throw new Error(`El usuario con id: ${id} no existe `);
  }
};

const idTodoExists = async (id) => {
  const todoDB = await Todo.findById(id);
  if (!todoDB) {
    throw new Error(`El todo con id: ${id} no existe`);
  }
};

module.exports = {
  idUserExists,
  idTodoExists,
};
