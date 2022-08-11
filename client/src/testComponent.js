import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";

export class testComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
    };
  }

  showModal = () => {
    this.setState({ modalShow: true });
  };

  hideModal = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <>
        <button className=" btn btn-danger" onClick={this.showModal}>
          Delete
        </button>
        <div>
          <Modal show={this.state.modalShow} top>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please confirm that you want to delete the selected Exercise!!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.hideModal}>
                Confirm
              </Button>
              <Button variant="info" onClick={this.showModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default testComponent;
