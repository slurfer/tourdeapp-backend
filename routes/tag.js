const express = require("express");

const tagController = require("../controllers/tag");

const router = express.Router();

router.post("/", tagController.postTag);

router.get("/", tagController.getTags);

module.exports = router;
