const express = require("express");

const programmerController = require("../controllers/programmer");

const router = express.Router();

router.post("/", programmerController.postProgrammer);

router.get("/", programmerController.getProgrammers);

router.delete("/:programmerId", programmerController.deleteProgrammers);

router.put("/:programmerId", programmerController.putProgrammers)

module.exports = router;
