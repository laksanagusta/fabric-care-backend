const router = require('express').Router();
const spendingController = require('../controllers/spendingController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', spendingController.addSpending);
router.put('/', spendingController.editSpending);
router.delete('/:id', spendingController.deleteSpending);

module.exports = router;