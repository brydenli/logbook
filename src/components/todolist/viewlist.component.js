import React, { Component } from 'react';
import axios from 'axios';

//refer to exercises-list for how to use Link to link to the snapshot links

const Snapshots = (props) => (
	<tr>
		<td>{props.snapshot._id}</td>
		<td>{props.snapshot.date}</td>
		<td>{props.snapshot.task}</td>
		<td>{props.snapshot.description}</td>
		<td>{props.snapshot.notes}</td>
		<td>{props.snapshot.urgency}</td>
		<td>{props.snapshot.status}</td>
		<td>{props.snapshot.createdAt}</td>
		<td>{props.snapshot.updatedAt}</td>
		<td>{props.snapshot.__v}</td>
	</tr>
);

export default class ViewSnapshot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
		};

		this.snapshotList = this.snapshotList.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:4001/todolist/' + this.props.match.params.id)
			.then((res) => {
				this.setState({
					todos: res.data.todos,
					date: res.data.date,
				});
			})
			.catch((err) => console.log(err));
	}

	snapshotList() {
		return this.state.todos.map((todo) => {
			return <Snapshots snapshot={todo} key={todo._id}></Snapshots>;
		});
	}

	render() {
		return (
			<div>
				<h2>Saved Log</h2>
				<h5>Date: {this.state.date}</h5>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>ID</th>
							<th>Completion Date</th>
							<th>Task</th>
							<th>Description</th>
							<th>Notes</th>
							<th>Urgency</th>
							<th>status</th>
							<th>createdAt</th>
							<th>updatedAt</th>
							<th>Version</th>
						</tr>
					</thead>
					<tbody>{this.snapshotList()}</tbody>
				</table>
			</div>
		);
	}
}
