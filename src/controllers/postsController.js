const router = require('express').Router();
const { mapErrors } = require('../utils/mapErrors');
const { isUser } = require('../middleware/guardsMiddleware');
const { createPost, getAllPosts, getPostById, editPostById, deletePostById } = require('../services/postsService');

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

router.get('/edit/:id', isUser(), async (req, res) => {
	try {
		const post = await getPostById(req.params.id);

		if (req.session.user._id != post.author._id) {
			throw new Error('Only owners can edit post');
		}

		res.render('edit', { post, title: `Edit: ${post.title}` })
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
});

router.post('/edit/:id', isUser(), async (req, res) => {
	try {
		await editPostById(req.params.id, req.body, req.session.user._id);
		res.redirect('/posts/details/' + req.params.id);
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
});

router.get('/delete/:id', async (req, res) => {
	try {
		const post = await getPostById(req.params.id);

		if (req.session.user._id != post.author._id) {
			throw new Error('Only owners can delete posts')
		}

		await deletePostById(req.params.id);
		res.redirect('/posts');
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
});

router.get('/details/:id', async (req, res) => {
	try {
		const post = await getPostById(req.params.id);

		if (req.session?.user?._id == post.author._id) {
			res.locals.isOwner = true;
		}

		if (post.votes.includes(res.session?.user?._id)) {
			res.locals.hasVoted = true;
		}

		res.render('details', { title: post.title, post })
	} catch (err) {
		const errors = mapErrors(err);
		res.render('404', { errors })
	}
});

module.exports = router;