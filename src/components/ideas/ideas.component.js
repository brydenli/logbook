import React, { Component } from 'react';
import IdeaList from './idea-list.component';
import CreateIdea from './create-ideas.component';

export default class Ideas extends React.Component {
	render() {
		return (
			<div>
				<IdeaList></IdeaList>
			</div>
		);
	}
}
