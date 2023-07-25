const express = require("express");

const recordController = require("../controllers/record");

const router = express.Router();

router.get("/", recordController.getRecord);

router.post("/", recordController.postRecord);

router.delete("/:recordId", recordController.deleteRecord);

router.put("/:recordId", recordController.putRecord);

module.exports = router;
