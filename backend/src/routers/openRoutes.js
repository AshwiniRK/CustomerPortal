const express = require('express');
const router = express.Router();
const mainController=require('../controller/mainController')

router.post('/login',mainController.userLogin)

module.exports = router;