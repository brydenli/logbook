const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

const todoRouter = require('./routes/todo.route');
const todoListRouter = require('./routes/todoList.route');
const ideaRouter = require('./routes/ideas.route');

app.use('/todos', todoRouter);
app.use('/todolist', todoListRouter);
app.use('/ideas', ideaRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
