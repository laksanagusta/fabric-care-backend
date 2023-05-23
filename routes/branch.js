const router = require('express').Router();
const branchController = require('../controllers/branchController');
const auth = require('../middlewares/authbackend');

router.use(auth);
router.post('/', branchController.addBranch);
router.put('/', branchController.editBranch);
router.delete('/:id', branchController.deleteBranch);

module.exports = router;