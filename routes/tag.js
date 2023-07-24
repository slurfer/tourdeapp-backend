const express = require('express');

const tagController = require('../controllers/tag');

const router = express.Router();

router.post('/', tagController.postTag);


module.exports = router;