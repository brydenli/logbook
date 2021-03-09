import React, { Component } from 'react';
import TodoList from './todo/todo.component';

export default class Main extends Component {
	render() {
		return (
			<div>
				<TodoList></TodoList>
			</div>
		);
	}
}
