const router = require('express').Router();
const { mapErrors } = require('../utils/mapErrors');
const { isUser } = require('../middleware/guardsMiddleware');
const { createPost, getAllPosts, getPostById } = require('../services/postService');

// ALL POSTS PAGE
router.get('/', async (req, res) => {
	try {
		const posts = await getAllPosts();
		res.render('all-posts', { posts, title: 'All Posts' });
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
})

// CREATE NEW POST
router.get('/create', isUser(), (req, res) => {
	res.render('create', { title: 'Create Post' })
});

router.post('/create', isUser(), async (req, res) => {
	try {
		await createPost(req.body, req.session.user._id);
		res.redirect('/posts')
	} catch (err) {
		const errors = mapErrors(err);
		res.render('create', { errors, values: req.body })
	}
});

router.get('/details/:id', async (req, res) => {
	try {
		const post = await getPostById(req.params.id);
		res.render('details', { title: post.title, post })
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
})

module.exports = router;