const router = require('express').Router();
const authController = require('../../controllers/api/authController');

router.post('/signin', authController.signIn);

module.exports = router;