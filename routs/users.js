const express = require('express');
const router = express.Router();
const passport = require('passport');

const UsersController = require('../controllers/users_controller');

router.get('/profile/:id' , passport.checkAuthentication , UsersController.profile);
router.post('/update/:id',passport.checkAuthentication,UsersController.update);
router.get('/sign-up', UsersController.signUp);
router.get('/sign-in', UsersController.singIn);


router.post('/create' , UsersController.create);

// use passport as a  middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),UsersController.createSession);

router.get('/sign-out',UsersController.destroySession);

module.exports = router;