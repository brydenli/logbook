const router = require('express').Router();
let Ideas = require('../models/ideas.model');

router.route('/').get((req, res, next) => {
	Ideas.find()
		.then((idea) => res.json(idea))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res, next) => {
	Ideas.findById(req.params.id)
		.then((idea) => res.json(idea))
		.catch((err) => `Error: ${err}`);
});

router.route('/add').post((req, res, next) => {
	const name = req.body.name;
	const description = req.body.description;
	const notes = req.body.notes;

	const newIdea = new Ideas({
		name,
		description,
		notes,
	});

	newIdea
		.save()
		.then(() => res.json('New idea saved!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res, next) => {
	Ideas.findById(req.params.id)
		.then((idea) => {
			(idea.name = req.body.name),
				(idea.description = req.body.description),
				(idea.notes = req.body.notes),
				idea
					.save()
					.then(() => res.json('Idea has been updated!'))
					.catch((err) => res.status(404).send(`Error: ${err}`));
		})
		.catch((err) => res.status(404).send(`Error: ${err}`));
});

router.route('/:id').delete((req, res, next) => {
	Ideas.findByIdAndDelete(req.params.id)
		.then(() => res.json('Task has been deleted!'))
		.catch((err) => `Error: ${err}`);
});

module.exports = router;
