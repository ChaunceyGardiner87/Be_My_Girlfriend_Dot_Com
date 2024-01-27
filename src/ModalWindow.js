import React, { Component } from 'react';
import Modal from "react-modal";
import $ from 'jquery';

export default class ModalWindow extends React.Component {
    constructor () {
      super();
      this.state = {
        accepted: false,
        declined: false
      }
      this.acceptTerms = this.acceptTerms.bind(this);
      this.declineTerms = this.declineTerms.bind(this);
      this.requstCloseModal = this.requstCloseModal.bind(this);
    }

    acceptTerms() {
      this.setState({
        accepted: true,
        declined: false
      });

      $.ajax({
        type: 'POST',
        url: '/contact',
        data: {
          message: "She said yes"
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

    declineTerms() {
     this.setState({
        declined: true,
        accepted: false
      }); 

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

    requstCloseModal() {
      this.props.closeModal();
      this.setState({
        accepted: false,
        declined: false
      });
    }

    getText() {
      if (this.props.modalType === "terms" && this.state.accepted === false && this.state.declined === false) {
        return (
          <div>
          <h1>Terms and Conditions</h1>
            <p>
              1. Enjoying and valuing time together; and actively working to make it happen <br/><br/>
              3. A commitment to updating the Trello adventure board<br/><br/>
              4. Effective communication and problem-solving skills <br/><br/>
              5. Charlie will provide foot rubs on request<br/><br/>
              6. Parties agree to utilise a vast array of emojis for all communication needs. 🌟❤️😊<br/><br/>
              7. Regular consumption of noodles is mandatory
          </p>

          <div className="acceptButton" style={{display: "inline-block", float: "left", marginLeft: "15%"}} onClick={this.acceptTerms}>
            <h1>Accept</h1>
          </div>

          <div className="acceptButton" style={{display: "inline-block", float: "right", marginRight: "15%"}} onClick={this.declineTerms}>
            <h1>Decline</h1>
          </div>
          </div>
        );
      } else if (this.props.modalType === "declined" || this.state.declined === true) {
        return(
          <div className="smallText">
            <p>
              404. That's an error. Try again please.
          </p>
          </div>
        );
      } else if (this.state.accepted === true) {
        return(
          <div className="smallText">
            <p>
              Your request has been noted, and submitted for processing.<br/><br/>
              I will get back to you within 1 business day.<br/><br/>
            </p>
          </div>
        );
      }
    }

    render () {
      return (
        <div>
          <Modal onRequestClose={this.requstCloseModal} contentLabel={"Terms and Conditions"} isOpen={this.props.isOpen} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.4)'}}}>
          <button className="closeModalButton" onClick={this.requstCloseModal}>Close</button>
            {this.getText()}
          </Modal>
        </div>
      );
    }
  }
