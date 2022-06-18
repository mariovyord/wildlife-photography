module.isUser = () => (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
}

module.isGuest = () => (req, res, next) => {
	if (req.session.user) {
		res.redirect('/');
	} else {
		next();
	}
}