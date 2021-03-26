import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const TodoList = (props) => (
	<tr>
		<td>{props.todolist.date}</td>
		<td>{props.todolist.name}</td>
		<td>
			<Link to={'/todolist/view/' + props.todolist._id}>Link</Link>
		</td>
		<td>
			<a
				href='#'
				onClick={() => {
					window.confirm(
						`Press OK to delete the following Log: ${props.todolist.name}`
					) && props.onDelete(props.todolist._id);
				}}
			>
				Delete
			</a>
		</td>
	</tr>
);

export default class TodoListList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			date: new Date(),
			todolists: [],
		};

		this.onChangeName = this.onChangeName.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.todoListList = this.todoListList.bind(this);
	}

	componentDidMount() {
		let temp = {};
		let temp1 = {};
		console.log('stage uno complete');

		axios
			.get('http://localhost:4001/todos/')
			.then((resArr) => {
				console.log(resArr);
				if (resArr.data.length > 0) {
					console.log('stage twuo complete');
					console.log(resArr.data);
					temp = resArr.data;
					console.log(`Temp is: ${temp}`);

					temp = temp.filter((e, index) => {
						return temp.indexOf(e) === index;
					});

					this.setState({
						todos: temp,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get('http://localhost:4001/todolist')
			.then((res) => {
				console.log(res);
				if (res.data.length > 0) {
					console.log('inside the GET if statement');
					console.log(res.data);
					temp1 = res.data;
					console.log(`Temp1 is: ${temp1}`);

					this.setState({
						todolists: temp1,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChangeDate(date) {
		this.setState({ date: date });
	}

	onChangeName(e) {
		this.setState({ name: e.target.value });
	}

	onDelete(id) {
		axios
			.delete('http://localhost:4001/todolist/' + id)
			.then((res) => console.log(res.data));

		this.setState({
			todolists: this.state.todolists.filter((e) => e._id !== id),
		});
	}

	onSubmit(e) {
		e.preventDefault();

		let temp = {};

		axios
			.get('http://localhost:4001/todos/')
			.then((resArr) => {
				console.log(resArr);
				if (resArr.data.length > 0) {
					console.log('stage twuo complete');
					console.log(resArr.data);
					temp = resArr.data;
					console.log(`Temp is: ${temp}`);

					temp = temp.filter((e, index) => {
						return temp.indexOf(e) === index;
					});

					this.setState({
						todos: temp,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		const todoList = {
			name: this.state.name,
			todos: this.state.todos,
			date: this.state.date,
		};

		console.log(todoList);

		axios
			.post('http://localhost:4001/todolist/add', todoList)
			.then((res) => console.log(res.data));

		window.location = '/archive';
	}

	todoListList() {
		return this.state.todolists.map((currentdate) => {
			return (
				<TodoList
					todolist={currentdate}
					key={currentdate._id}
					onDelete={this.onDelete}
				></TodoList>
			);
		});
	}

	render() {
		return (
			<div>
				<h2>Saved Logs</h2>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>Date</th>
							<th>Name</th>
							<th>Link</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{this.todoListList()}</tbody>
				</table>

				<div className='form-group'>
					<label>Log Name: </label>
					<div>
						<input
							value={this.state.name}
							onChange={this.onChangeName}
							type='text'
							required
							className='form-control'
						></input>
					</div>
				</div>

				<div className='form-group'>
					<label>Date: </label>
					<div>
						<DatePicker
							selected={this.state.date}
							onChange={this.onChangeDate}
							className='form-control'
						></DatePicker>
					</div>
				</div>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<input
							type='submit'
							className='btn btn-primary'
							value='Create Log'
						></input>
					</div>
				</form>
			</div>
		);
	}
}
