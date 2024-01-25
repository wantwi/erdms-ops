import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = props => {
  const { showModal, setShowModal, title,submitBtn } = props;

  const handleClickEvent =()=>{

    submitBtn.current.click()
    //setShowModal(!showModal)
  }
  return (
    <div>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        size="lg"
        //className={className}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
        <Button
            className="c-secondary"
           
            onClick={() => setShowModal(!showModal)}
          >
            Cancel
          </Button>
          <Button
            className="c-primary"
            onClick={handleClickEvent}
           
          >
            Save
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
