const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Todo = require("../models/todo");

//Obtener todo por Id
const getTodoById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const todoDB = await Todo.findById(id).populate("user", "name");
    res.status(200).json({
      error: false,
      todo: todoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/todo/{id}",
    });
  }
};

//Obtener los todos por Usuario
const getTodosByUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const todosDB = await Todo.find({ user: ObjectId(id) }).populate(
      "user",
      "name"
    );
    res.status(200).json({
      error: false,
      todos: todosDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/todo/user/{id}",
    });
  }
};

//Crear todo / privado solo usuarios con token
const postTodo = async (req = request, res = response) => {
  let { bodyTodo, category } = req.body;
  //validación categoria exists
  if (!category) {
    return res.status(400).json({
      error: 401,
      msg: "La categoria es requerida",
      path: "/api/todo",
    });
  }
  category = category.toUpperCase();
  const categoryValid = ["WORK", "HOME", "SCHOOL"];

  try {
    //validación categoria
    if (!categoryValid.includes(category)) {
      return res.status(400).json({
        error: 400,
        msg: `${category} no es una categoria válida, categorias validas:"WORK, HOME, SCHOOL" `,
        path: "/api/todo/",
      });
    }

    const data = {
      bodyTodo,
      category,
      user: req.user._id,
    };

    const todo = new Todo(data);
    await todo.save();

    res.status(201).json({
      error: false,
      msg: "Todo creado",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/todo",
    });
  }
};

//Actualizar todo / privado solo usuarios con token
const putTodo = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, ...todoB } = req.body;
  try {
    const todoDB = await Todo.findByIdAndUpdate(id, todoB, { new: true });
    res.status(200).json({
      error: false,
      msg: "Todo actualizado",
      todo: todoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/todo/{id}",
    });
  }
};

//Eliminar todo / privado solo usuarios con token
const deleteTodo = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndRemove(id);
    res.status(200).json({
      error: false,
      msg: "Todo borrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 500,
      msg: "Hable con el administrador",
      path: "/api/todo/{id}",
    });
  }
};
module.exports = {
  getTodoById,
  getTodosByUser,
  postTodo,
  putTodo,
  deleteTodo,
};
