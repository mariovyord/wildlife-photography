const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 6,
	},
	keyword: {
		type: String,
		required: true,
		minlength: 6,
	},
	location: {
		type: String,
		required: true,
		maxlength: 15,
	},
	creation_date: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.length === 10;
			},
			message: 'Date should be 10 characters long'
		},
	},
	image: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.startsWith('http://') || v.startsWith('https://');
			},
			message: 'Image URL should be a valid link'
		},
	},
	description: {
		type: String,
		required: true,
		minlength: 10,
	},
	author: {
		type: ObjectId,
		ref: 'User',
	},
	votes: {
		type: [ObjectId],
		ref: 'User',
		default: [],
	},
	rating: {
		type: Number,
		default: 0,
	}
});

const Post = model('Post', postSchema);

module.exports = Post;