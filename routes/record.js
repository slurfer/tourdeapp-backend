const express = require('express');


const recordController = require('../controllers/record');

const router = express.Router();


router.get('/', recordController.getRecord);

router.post('/', recordController.postRecord);





module.exports = router;