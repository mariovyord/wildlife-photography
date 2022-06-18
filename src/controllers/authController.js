const { register, login } = require('../services/authService');
const { mapErrors } = require('../utils/mapErrors');
const { isUser, isGuest } = require('../middleware/guardsMiddleware');

const router = require('express').Router();

// LOGIN
router.get('/login', isGuest(), (req, res) => {
	res.render('login');
});

router.post('/login', isGuest(), async (req, res) => {
	try {
		await login(req.body, req.session);
		res.redirect('/');
	} catch (err) {
		const errors = mapErrors(err);
		res.render('login', { errors });
	}
});

// REGISTER
router.get('/register', isGuest(), (req, res) => {
	res.render('register');
});

router.post('/register', isGuest(), async (req, res) => {
	try {
		if (req.body.password != req.body['re-password']) {
			throw new Error('Passwords should match')
		}

		await register(req.body, req.session);
		res.redirect('/');
	} catch (err) {
		const errors = mapErrors(err);
		res.render('register', { errors });
	}
})

// LOGOUT
router.all('/logout', isUser(), (req, res) => {
	delete req.session.user;
	console.log('Logout successful');
	res.redirect('/');
});

module.exports = router;