const taskController = require('../../controllers/api/taskController');

const router = require('express').Router();

router.post('/', taskController.createTask);

module.exports = router;