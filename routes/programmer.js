const express = require("express");

const programmerController = require("../controllers/programmer");

const router = express.Router();

router.post("/", programmerController.postProgrammer);

router.get('/', programmerController.getProgrammers);

module.exports = router;
