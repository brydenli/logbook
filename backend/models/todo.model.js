const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		task: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		notes: {
			type: String,
		},
		urgency: {
			type: String,
		},
		status: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
