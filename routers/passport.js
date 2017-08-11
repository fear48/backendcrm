const express = require("express");
const passportController = require("../controllers/passportController");

const router = express.Router();

router.post("/registration", passportController.registration);
router.post("/login", passportController.login);

module.exports = router;
