const transactionController = require('../../controllers/api/transactionController');

const router = require('express').Router();

router.get('/:transactionId', transactionController.findById);

module.exports = router;