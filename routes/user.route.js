const { Router } = require("express");
const { check } = require("express-validator");
const { getUserById, getUsers } = require("../controllers/user.controller");
const { idUserExists } = require("../security/dbValidators");
const { validateData } = require("../security/validateData");

const router = Router();

router.get("/", getUsers);

router.get("/:id", [
 check("id", "No es un id válido").isMongoId(),
 check("id").custom(idUserExists),
 validateData,
], getUserById);

module.exports = router;
