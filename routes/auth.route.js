const { Router } = require("express");
const { check } = require("express-validator");
const {
  registerAuth,
  loginAuth,
  revalidationAuth,
} = require("../controllers/auth.controller");
const { validateData } = require("../security/validateData");
const validateJWT = require("../security/validateJWT");

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateData,
  ],
  registerAuth
);
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateData,
  ],
  loginAuth
);
router.get("/renew", [validateJWT], revalidationAuth);

module.exports = router;
