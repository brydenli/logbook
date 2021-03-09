import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => (
	<tr>
		<td>{props.todo.date}</td>
		<td>{props.todo.task}</td>
		<td>{props.todo.description}</td>
		<td>{props.todo.status}</td>
		<td>{props.todo.urgency}</td>
		<td>{props.todo.notes}</td>
		<td>
			<Link to={'/todos/update/' + props.todo._id}>edit </Link>
		</td>
		<td>
			<a
				href='#'
				onClick={() => {
					window.confirm(
						`Press OK to delete the following Todo: ${props.todo.task}`
					) && props.deleteTodo(props.todo._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class TodoList extends Component {
	constructor(props) {
		super(props);

		this.state = { todos: [] };

		this.deleteTodo = this.deleteTodo.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:4001/todos/')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	deleteTodo(id) {
		axios
			.delete('http://localhost:4001/todos/' + id)
			.then((res) => console.log(res.data));

		this.setState({
			todos: this.state.todos.filter((e) => e._id !== id),
		});
	}

	todoList() {
		return this.state.todos.map((currenttodo) => {
			return (
				<Todo
					todo={currenttodo}
					deleteTodo={this.deleteTodo}
					key={currenttodo._id}
				></Todo>
			);
		});
	}

	render() {
		return (
			<div>
				<h2>Todo List</h2>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>Date</th>
							<th>Task</th>
							<th>Description</th>
							<th>Status</th>
							<th>Urgency</th>
							<th>Notes</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{this.todoList()}</tbody>
				</table>
			</div>
		);
	}
}
