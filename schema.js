const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	stock: {
		required: true,
		type: String,
		unique: true
	},
	likes: {
		required: true,
		type: Number
	}
})