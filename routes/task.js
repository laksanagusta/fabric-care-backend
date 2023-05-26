const router = require('express').Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', taskController.addTask);
router.put('/', taskController.editTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;