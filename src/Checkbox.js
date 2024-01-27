import React, { Component } from 'react';
import classnames from 'classnames';
import { Container } from 'react-bootstrap';

export default class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.click = this.click.bind(this);
	}

	click() {
		console.log("Box is clicked");
		this.props.clickHandler();
	}

	render() {
		var style = {
			display: "inline-block"
		};

		var classes;

		if (this.props.selected) {
			classes = classnames("checkbox", "checked");
		} else {
			classes = classnames("checkbox", "unchecked");
		}


		return(
			<div className="checkbox-container">
				<div className={classes} id={this.props.idName} onClick={this.click}/>
				<h2>{this.props.boxText}</h2>
			</div>
		)
	}
}