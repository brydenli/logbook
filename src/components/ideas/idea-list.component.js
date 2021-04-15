import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Idea = (props) => (
	<tr>
		<td>{props.idea.name}</td>
		<td>{props.idea.description}</td>
		<td>{props.idea.notes}</td>
		<td>{props.idea.status}</td>
		<td>
			<Link to={'/ideas/update/' + props.idea._id}>edit </Link>
		</td>
		<td>
			<a
				href='#'
				onClick={() => {
					window.confirm(
						`Press OK to delete the following idea/goal: ${props.idea.name}`
					) && props.deleteIdea(props.idea._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class IdeaList extends Component {
	constructor(props) {
		super(props);

		this.state = { ideas: [] };

		this.deleteIdea = this.deleteIdea.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:4001/ideas/')
			.then((res) => {
				this.setState({ ideas: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	deleteIdea(id) {
		axios
			.delete('http://localhost:4001/ideas/' + id)
			.then((res) => console.log(res.data));

		this.setState({
			ideas: this.state.ideas.filter((e) => e._id !== id),
		});
	}

	ideaList() {
		return this.state.ideas.map((currentidea) => {
			return (
				<Idea
					idea={currentidea}
					deleteIdea={this.deleteIdea}
					key={currentidea._id}
				></Idea>
			);
		});
	}

	render() {
		return (
			<div>
				<h2>List of Ideas/Goals</h2>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Notes</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{this.ideaList()}</tbody>
				</table>
				<div>
					<Link to='create-idea'>
						<button
							renderAs='button'
							className='btn btn-primary'
							value='add idea'
						>
							<span>Add New</span>
						</button>
					</Link>
				</div>
			</div>
		);
	}
}
