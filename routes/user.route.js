const { Router } = require("express");
const { check } = require("express-validator");
const { getUserById } = require("../controllers/user.controller");

const router = Router();

router.get("/:id", getUserById);

module.exports = router;
