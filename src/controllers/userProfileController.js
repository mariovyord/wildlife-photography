const { mapErrors } = require('../utils/mapErrors');
const { getPostsByUserId } = require('../services/postsService');

// ALL POSTS PAGE
exports.userProfile = async (req, res) => {
	console.log('here')
	try {
		const posts = await getPostsByUserId(req.params.id);
		res.render('login', { title: 'My posts', posts })
	} catch (err) {
		const errors = mapErrors(err);
		console.log('errors', err)
		res.render('404', { errors, title: '404' });
	}
}