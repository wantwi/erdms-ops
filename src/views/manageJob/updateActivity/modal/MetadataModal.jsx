import React, { useState } from "react";
import {
  UncontrolledCollapse,
  CardBody,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const MetadataModal = (props) => {
  const { isOpen, setIsOpen, submitBtn, addNew, setAddNew } = props;

  return (
    <div>
      <Modal isOpen={isOpen} size="lg">
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span className="mb-3" style={{ fontWeight: 900 }}>
            Meta Data Infomation
          </span>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => {setIsOpen(false)}}>
            Close
          </Button>
          {addNew ? <Button className="c-danger" onClick={() => {setAddNew(false)}}>
          Cancel
        </Button>: null
          
        }
          
          {addNew ? (
            <Button
              className="c-primary"
              onClick={() => submitBtn.current.click()}
            >
              Submit
            </Button>
          ) :   null}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MetadataModal;
