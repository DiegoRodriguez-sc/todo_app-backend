const { request, response } = require("express");
const Todo = require("../models/todo");

const getTodosByUser = async (req = request, res = response) => {};

module.exports = {
  getTodosByUser,
};
