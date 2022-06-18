const User = require('../models/User');
const Post = require('../models/Post');

exports.createPost = async (data, authorId) => {
	const post = new Post({
		title: data.title.trim(),
		keyword: data.keyword.trim(),
		location: data.location.trim(),
		creation_date: data.creation_date.trim(),
		image: data.image.trim(),
		description: data.description.trim(),
		author: authorId,
	});

	return post.save();
}