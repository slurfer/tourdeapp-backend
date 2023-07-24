const express = require("express");

const recordController = require("../controllers/record");

const router = express.Router();

router.get("/", recordController.getRecord);

router.post("/", recordController.postRecord);

router.delete("/:recordId", recordController.deleteRecord);

module.exports = router;
