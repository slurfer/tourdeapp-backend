const express = require("express");

const programmerController = require("../controllers/programmer");

const router = express.Router();

router.post("/", programmerController.postProgrammer);

module.exports = router;
