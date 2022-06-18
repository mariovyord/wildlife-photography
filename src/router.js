const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const authMiddleware = require('./middleware/authMiddleware');
const postsConroller = require('./controllers/postsController');
const { isUser } = require('./middleware/guardsMiddleware');

const { mapErrors } = require('./utils/mapErrors');
const { getPostsByUserId } = require('./services/postsService');

const router = require('express').Router();

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

router.use(authMiddleware());

router.get('/', homeController);

router.use('/auth', authController);
router.use('/posts', postsConroller);
router.get('/posts/user/:id', isUser(), async (req, res) => {
	console.log('here')
	try {
		const posts = await getPostsByUserId(req.params.id);
		res.render('my-posts', { title: 'My posts', posts })
	} catch (err) {
		const errors = mapErrors(err);
		console.log('errors', err)
		res.render('404', { errors, title: '404' });
	}
})

router.all('*', (req, res) => {
	res.render('404');
})

module.exports = router;