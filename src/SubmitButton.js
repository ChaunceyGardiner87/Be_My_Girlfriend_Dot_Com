import React, { Component } from 'react';

export default class SubmitButton extends Component {
	render() {
		return(
			<div className="submitButton" onClick={this.props.clickHandler}>
				<h2>Submit</h2>
			</div>
		);
	}
}