const router = require('express').Router();
let Todo = require('../models/todo.model');

router.route('/').get((req, res, next) => {
	Todo.find()
		.then((todo) => res.json(todo))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res, next) => {
	Todo.findById(req.params.id)
		.then((todo) => res.json(todo))
		.catch((err) => `Error: ${err}`);
});

router.route('/add').post((req, res, next) => {
	const date = Date.parse(req.body.date);
	const task = req.body.task;
	const description = req.body.description;
	const notes = req.body.notes;
	const urgency = req.body.urgency;
	const status = req.body.status;

	const newTodo = new Todo({
		date,
		task,
		description,
		notes,
		urgency,
		status,
	});

	newTodo
		.save()
		.then(() => res.json('New todo saved!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res, next) => {
	Todo.findById(req.params.id)
		.then((todo) => {
			(todo.date = Date.parse(req.body.date)),
				(todo.task = req.body.task),
				(todo.description = req.body.description),
				(todo.notes = req.body.notes),
				(todo.urgency = req.body.urgency),
				(todo.status = req.body.status);
			todo
				.save()
				.then(() => res.json('Todo has been updated!'))
				.catch((err) => res.status(404).send(`Error: ${err}`));
		})
		.catch((err) => res.status(404).send(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	Todo.findByIdAndDelete(req.params.id)
		.then(() => res.json('Task has been deleted!'))
		.catch((err) => `Error: ${err}`);
});

module.exports = router;
