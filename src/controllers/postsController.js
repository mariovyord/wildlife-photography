const router = require('express').Router();
const { mapErrors } = require('../utils/mapErrors');
const { isUser } = require('../middleware/guardsMiddleware');
const { createPost } = require('../services/postService');

// ALL POSTS PAGE
router.get('/', (req, res) => {
	res.render('all-posts', { title: 'All Posts' })
})


// CREATE NEW POST
router.get('/create', isUser(), (req, res) => {
	res.render('create', { title: 'Create Post' })
});

router.post('/create', isUser(), async (req, res) => {
	try {
		await createPost(req.body);
		res.redirect('/posts')
	} catch (err) {
		const errors = mapErrors(err);
		res.render('create', { errors, values: req.body })
	}
});

module.exports = router;