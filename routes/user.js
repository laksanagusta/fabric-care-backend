const router = require('express').Router();
const userController = require('../controllers/userController');
const {upload} = require('../middlewares/multer');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.put('/', upload, userController.editUser);

module.exports = router;