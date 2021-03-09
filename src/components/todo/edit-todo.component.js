import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: '',
			task: '',
			description: '',
			notes: '',
			urgency: '',
			status: '',
		};

		this.onChangeDate = this.onChangeDate.bind(this);
		this.onChangeTask = this.onChangeTask.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeUrgency = this.onChangeUrgency.bind(this);
		this.onChangeStatus = this.onChangeStatus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:4001/todos/' + this.props.match.params.id)
			.then((res) => {
				this.setState({
					date: res.data.date,
					task: res.data.task,
					description: res.data.description,
					notes: res.data.notes,
					urgency: res.data.urgency,
					status: res.data.status,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChangeDate(e) {
		this.setState({
			date: e.target.value,
		});
	}
	onChangeTask(e) {
		this.setState({
			task: e.target.value,
		});
	}
	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}
	onChangeNotes(e) {
		this.setState({
			notes: e.target.value,
		});
	}

	onChangeUrgency(e) {
		this.setState({
			urgency: e.target.value,
		});
	}

	onChangeStatus(e) {
		this.setState({
			status: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const todo = {
			date: this.state.date,
			task: this.state.task,
			description: this.state.description,
			notes: this.state.notes,
			urgency: this.state.urgency,
			status: this.state.status,
		};

		console.log(todo);

		axios
			.post('http://localhost:4001/todos/' + this.props.match.params.id, todo)
			.then((res) => console.log(res.data));

		window.location = '/';
	}

	render() {
		return (
			<div>
				<h2>Edit Todo</h2>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Date: </label>
						<input
							type='text'
							required
							className='form-control'
							value={this.state.date}
							onChange={this.onChangeDate}
						></input>
					</div>

					<div className='form-group'>
						<label>Task: </label>
						<input
							type='text'
							required
							className='form-control'
							value={this.state.task}
							onChange={this.onChangeTask}
						></input>
					</div>

					<div className='form-group'>
						<label>Description: </label>
						<input
							type='text'
							className='form-control'
							value={this.state.description}
							onChange={this.onChangeDescription}
						></input>
					</div>

					<div className='form-group'>
						<label>Notes: </label>
						<input
							type='text'
							className='form-control'
							value={this.state.notes}
							onChange={this.onChangeNotes}
						></input>
					</div>

					<div className='form-group'>
						<label>Urgency: </label>
						<select
							name='urgency'
							id='Urgency'
							required
							className='form-control'
							value={this.state.urgency}
							onChange={this.onChangeUrgency}
						>
							<option value='N/A'>N/A</option>
							<option value='Low'>Low</option>
							<option value='Medium'>Medium</option>
							<option value='High'>High</option>
						</select>
					</div>

					<div className='form-group'>
						<label>Status: </label>
						<select
							name='completed'
							id='Completed'
							className='form-control'
							value={this.state.status}
							onChange={this.onChangeStatus}
						>
							<option value=''></option>
							<option value='Started'>Started</option>
							<option value='On Hold'>On Hold</option>
							<option value='In Progress'>In Progress</option>
							<option value='Completed'>Completed</option>
						</select>
					</div>

					<div className='form-group'>
						<input
							type='submit'
							className='btn btn-primary'
							value='Edit Todo'
						></input>
					</div>
				</form>
			</div>
		);
	}
}
