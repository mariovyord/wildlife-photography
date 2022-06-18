const User = require('../models/User');

exports.login = async (userData, session) => {
	const currentUser = await User.findOne({ username: userData.username });

	if (!currentUser) {
		throw new Error('Incorect username or password')
	}

	const isValid = await currentUser.comparePassword(userData.password);

	if (isValid) {
		session.user = {
			_id: currentUser._id,
			fullName: currentUser.fullName,
			username: currentUser.username,
		}
		console.log('Sign up successful');
	} else {
		throw new Error('Invalid username or password')
	}
}

exports.register = async (userData, session) => {
	const user = new User({
		fullName: userData.name,
		username: userData.username,
		password: userData.password,
	});
	await user.save();

	session.user = {
		_id: user._id,
		fullName: user.fullName,
		username: user.username,
	}
	console.log('Sign up successful');
}
