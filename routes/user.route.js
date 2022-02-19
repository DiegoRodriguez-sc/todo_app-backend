const { Router } = require("express");
const { check } = require("express-validator");
const { getUserById, getUsers } = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
