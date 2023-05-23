const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authbackend');

router.get('/signin', adminController.viewSignIn);
router.post('/signin', adminController.signIn);
router.get('/signup', adminController.viewSignUp);
router.post('/', adminController.signUp);
router.use(auth);
router.get('/logout', adminController.logout);
router.get('/dashboard', adminController.viewDashboard);
router.get('/transaction', adminController.viewTransaction);
router.get('/user', adminController.viewUser);
router.get('/service', adminController.viewService);
router.get('/spending', adminController.viewSpending);
router.get('/branch', adminController.viewBranch);
router.get('/rack', adminController.viewRack);
router.get('/flow', adminController.viewFlow);

module.exports = router;