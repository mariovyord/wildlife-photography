const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	posts: {
		type: [mongoose.Types.ObjectId],
		ref: 'Post',
		default: [],
	}
})

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
		console.log('Hashing new password');
	}
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;