const router = require('express').Router();
let todoList = require('../models/todoList.model');

router.route('/').get((req, res, next) => {
	todoList
		.find()
		.then((response) => res.json(response))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res, next) => {
	todoList
		.findById(req.params.id)
		.then((response) => res.json(response))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res, next) => {
	const name = req.body.name;
	const date = Date.parse(req.body.date);
	const todos = req.body.todos;

	const newTodoList = new todoList({
		name,
		date,
		todos,
	});

	newTodoList
		.save()
		.then(() => res.json('New TodoList saved!'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').post((req, res, next) => {
	todoList
		.findById(req.params.id)
		.then((todolist) => {
			(todolist.name = req.body.name)(
				(todolist.date = Date.parse(req.body.date))
			),
				(todolist.todos = req.body.todos),
				todolist
					.save()
					.then(() => res.json('TodoList has been updated!'))
					.catch((err) => res.status(404).json(`Error: ${err}`));
		})
		.catch((err) => res.status(404).send(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	todoList
		.findByIdAndDelete(req.params.id)
		.then(() => res.json('TodoList has been deleted!'))
		.catch((err) => res.status(404).send(`Error: ${err}`));
});

module.exports = router;
