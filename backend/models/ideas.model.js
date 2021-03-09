const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideasSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	notes: {
		type: String,
	},
});

const Ideas = mongoose.model('Ideas', ideasSchema);

module.exports = Ideas;
