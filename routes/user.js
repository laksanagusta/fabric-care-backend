const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.put('/', userController.editUser);
router.post('/', userController.createNewUser);

module.exports = router;