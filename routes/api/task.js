const taskController = require('../../controllers/api/taskController');
const { authJWT } = require('../../middlewares/authJWT');

const router = require('express').Router();

router.use(authJWT)
router.post('/', taskController.createTask);

module.exports = router;