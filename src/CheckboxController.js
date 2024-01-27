import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Container from 'react-bootstrap/Container';
import classnames from 'classnames';

export default class CheckboxController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yesChecked: false,
			noChecked: false
		}

		this.yesBoxClickHandler = this.yesBoxClickHandler.bind(this);
		this.noBoxClickHandler = this.noBoxClickHandler.bind(this);
	}

	yesBoxClickHandler() {
		console.log("Clickhandler is fired");
		if (this.state.yesChecked) {
			this.setState({
				yesChecked: false,
				noChecked: false
			});
			this.props.callback(null)
		} else {
			this.setState({
				yesChecked: true,
				noChecked: false
			});
			this.props.callback("terms")
		}
	}

	noBoxClickHandler() {
		if (this.state.noChecked) {
			this.setState({
				yesChecked: false,
				noChecked: false
			});
			this.props.callback(null)
		} else {
			this.setState({
				yesChecked: false,
				noChecked: true
			});
			this.props.callback("declined")
		}
	}

	render() {
		return(
			<Container fluid className="boxes d-flex">
				<Checkbox idName = "yesBox" boxText="Yes!" clickHandler={this.yesBoxClickHandler} selected={this.state.yesChecked}/>
				<Checkbox idName = "noBox" boxText="No Way!" clickHandler={this.noBoxClickHandler} selected={this.state.noChecked}/>
	      	</Container>
      	);
	}
}