const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', transactionController.addTransaction);
router.put('/', transactionController.editTransaction);
router.post('/transaction-history', transactionController.addTransactionHistory);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/:transactionId', transactionController.transactionDetail);

router.post('/revenue-yearly', transactionController.revenueChartYearly);
router.post('/report-per-service-current-date', transactionController.reportPerServiceCurrentDate);

module.exports = router;