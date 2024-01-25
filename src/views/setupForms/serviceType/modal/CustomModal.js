import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = props => {
  const { showModal, setShowModal, title } = props;
  return (
    <div>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        size="lg"
        //className={className}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          {title}
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button
            className="c-primary"
            onClick={() => setShowModal(!showModal)}
          >
            Save
          </Button>{" "}
          <Button
            className="c-secondary"
            onClick={() => setShowModal(!showModal)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;

/* eslint import/no-webpack-loader-syntax: off */
