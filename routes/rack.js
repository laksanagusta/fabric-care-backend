const router = require('express').Router();
const rackController = require('../controllers/rackController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', rackController.addRack);
router.put('/', rackController.editRack);
router.delete('/:id', rackController.deleteRack);

module.exports = router;