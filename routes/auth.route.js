const { Router } = require("express");
const { registerAuth } = require("../controllers/auth.controller");

const router = Router();

router.post("/register", registerAuth);

module.exports = router;
