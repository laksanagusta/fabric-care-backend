const dashboardController = require('../../controllers/api/dashboardController');

const router = require('express').Router();

router.post('/', dashboardController.collectDashboardData);

module.exports = router;