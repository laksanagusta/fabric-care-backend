const router = require('express').Router();
const flowController = require('../controllers/flowController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', flowController.addFlow);
router.put('/', flowController.editFlow);
router.delete('/:id', flowController.deleteFlow);

module.exports = router;