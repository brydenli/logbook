import React, { Component } from 'react';
import axios from 'axios';

export default class EditIdea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			notes: '',
		};

		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:4001/ideas/' + this.props.match.params.id)
			.then((res) => {
				this.setState({
					name: res.data.name,
					description: res.data.description,
					notes: res.data.notes,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChangeName(e) {
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

	onSubmit(e) {
		e.preventDefault();

		const idea = {
			name: this.state.name,
			description: this.state.description,
			notes: this.state.notes,
		};

		console.log(idea);

		axios
			.post('http://localhost:4001/ideas/' + this.props.match.params.id, idea)
			.then((res) => console.log(res.data));

		window.location = '/ideas';
	}

	render() {
		return (
			<div>
				<h2>Edit Idea</h2>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Name: </label>
						<input
							type='text'
							required
							className='form-control'
							value={this.state.name}
							onChange={this.onChangeName}
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
						<input
							type='submit'
							className='btn btn-primary'
							value='Edit Idea'
						></input>
					</div>
				</form>
			</div>
		);
	}
}
