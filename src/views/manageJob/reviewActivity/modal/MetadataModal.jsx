import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MetadataModal = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <div>
      {" "}
      <Modal isOpen={isOpen} size="lg">
        <ModalHeader style={{background:"#e0e6ef", borderBottom:"1px solid #563c91"}}>
          <span className="mb-3" style={{ fontWeight: 900 }}>
           Meta Data Infomation
          </span>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {/* <Button
            className="c-primary"
            onClick={() => submitBtn.current.click()}
          >
            Submit
          </Button>{" "} */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MetadataModal;
