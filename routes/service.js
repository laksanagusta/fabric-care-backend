const router = require('express').Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', serviceController.addService);
router.put('/', serviceController.editService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;