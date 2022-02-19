const { Router } = require("express");
const { registerAuth, loginAuth } = require("../controllers/auth.controller");

const router = Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);

module.exports = router;
