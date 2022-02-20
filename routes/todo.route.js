const { Router } = require("express");
const { check } = require("express-validator");
const { postTodo } = require("../controllers/todo.controller");
const { validateData } = require("../security/validateData");
const validateJWT = require("../security/validateJWT");

const router = Router();

router.post("/", [validateJWT, validateData], postTodo);

module.exports = router;
