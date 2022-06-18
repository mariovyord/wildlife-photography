const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const authMiddleware = require('./middleware/authMiddleware');

const router = require('express').Router();

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

router.use(authMiddleware());

router.get('/', homeController);

router.use('/auth', authController);

router.all('*', (req, res) => {
	res.render('404');
})

module.exports = router;