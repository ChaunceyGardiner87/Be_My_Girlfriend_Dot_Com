import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CheckboxController from './CheckboxController';
import SubmitButton from './SubmitButton';
import $ from 'jquery';

import ModalWindow from './ModalWindow';
import { Stack } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      answer: null
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.checkboxCallback = this.checkboxCallback.bind(this);
  }

  submitHandler() {
    if (this.state.answer == null) {
      return;
    }
    console.log("Openning modal");
    this.setState({modalOpen: true});

    if (this.state.answer === "declined") {
      $.ajax({
        type: 'POST',
        url: '/contact',
        data: {
          message: "She said no"
        }
      })
        .done((data) => {
          console.log(data.message);
        })
        .fail((jqXhr) => {
          // console.log(jqXhr.responseJSON.message);
          console.log("Post request failed");
        });
    }
  }


  closeModal() {
    this.setState({modalOpen: false});
  }

  checkboxCallback(answer){
    this.setState({answer: answer});
  }

  render() {
    return (
      <Container fluid className='root'>
        <Stack>
          <h1>Holly, will you be my girlfriend?</h1>
          <CheckboxController callback={this.checkboxCallback} />
          <SubmitButton clickHandler={this.submitHandler}/>
          <ModalWindow modalType={this.state.answer} isOpen={this.state.modalOpen} ariaHideApp={false} closeModal={this.closeModal} />
        </Stack>
      </Container>
    );
  }
}
