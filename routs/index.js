const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// setting up multer
const path = require('path');
const multer = require('multer');

const upload = multer({dest:"uploads/avatar"});

router.get('/', homeController.home);
router.use('/users', require('./users'))
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router
// for any further routs, access form here
// router.use('/routerName',require('./routerFile'));

module.exports = router;