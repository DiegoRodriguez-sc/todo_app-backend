const { Router } = require("express");
const { check } = require("express-validator");
const { postTodo, getTodoById, getTodosByUser } = require("../controllers/todo.controller");
const { idTodoExists, idUserExists } = require("../security/dbValidators");
const { validateData } = require("../security/validateData");
const validateJWT = require("../security/validateJWT");

const router = Router();

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idTodoExists),
    validateData,
  ],
  getTodoById
);

router.get("/user/:id", [
 validateJWT,
 check("id", "No es un id válido").isMongoId(),
 check("id").custom(idUserExists),
 validateData
], getTodosByUser);

router.post("/", [validateJWT, validateData], postTodo);

module.exports = router;
