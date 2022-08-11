import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id || undefined,
      showModal: this.props.showModal || false,
      title: this.props.title || "Confirmation",
      bodyText: this.props.bodyText || "Please confirm",
      button1Label: this.props.button1Label || "Confirm",
      button1Variant: this.props.button1Variant || "primary",
      button2Label: this.props.button2Label || "Cancel",
      button2Variant: this.props.button2Variant || "info",
    };
  }

  render() {
    const {
      id,
      showModal,
      title,
      bodyText,
      button1Label,
      button1Variant,
      button2Label,
      button2Variant,
    } = this.state;
    const { btn1Function, btn2Function, closeHandle } = this.props;

    console.log(
      id,
      showModal,
      title,
      bodyText,
      button1Label,
      button1Variant,
      button2Label,
      button2Variant
    );

    return (
      <>
        <Modal onHide={closeHandle} show={showModal} top>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{bodyText}</Modal.Body>
          <Modal.Footer>
            <Button
              variant={button1Variant}
              onClick={() => {
                btn1Function(id);
              }}
            >
              {button1Label}
            </Button>
            <Button
              variant={button2Variant}
              onClick={() => {
                btn2Function(id);
              }}
            >
              {button2Label}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalComponent;
