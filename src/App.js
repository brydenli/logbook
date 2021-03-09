import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import Main from './components/main.component';
import CreateTodo from './components/todo/create-todo.component';
import EditTodo from './components/todo/edit-todo.component';
import ViewSnapshot from './components/todolist/viewlist.component';
import TodoListList from './components/todolist/create-todolist.component';
import Ideas from './components/ideas/idea-list.component';
import CreateIdea from './components/ideas/create-ideas.component';
import EditIdea from './components/ideas/edit-ideas.component';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar></Navbar>
				<br />
				<Route path='/' exact component={Main} />
				<Route path='/create-todo' component={CreateTodo} />
				<Route path='/archive' component={TodoListList} />
				<Route path='/todos/update/:id' component={EditTodo} />
				<Route path='/todolist/view/:id' component={ViewSnapshot} />
				<Route path='/ideas' exact component={Ideas} />
				<Route path='/create-idea' component={CreateIdea} />
				<Route path='/ideas/update/:id' component={EditIdea} />
			</Router>
		</div>
	);
}

export default App;
