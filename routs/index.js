const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'))
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
// for any further routs, access form here
// router.use('/routerName',require('./routerFile'));

module.exports = router;