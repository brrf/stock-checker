const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	stock: {
		required: true,
		type: String
	},
	likes: {
		required: true,
		type: Number
	}
})