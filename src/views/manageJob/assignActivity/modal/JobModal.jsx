import React,{useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col,Row } from "reactstrap";

const JobModal = (props) => {
  const { openModal, setOpenModal, jobInfo, 
    activities } = props;



  useEffect(() => {
    
  
    
  }, [activities])
  
  return (
    <div>
      {" "}
      <Modal isOpen={openModal} size="xl">
        <ModalHeader style={{background:"#e0e6ef", borderBottom:"1px solid #563c91"}}>
          <span style={{ fontWeight: 900 }}>
            Assign Officer

          </span>
         
        </ModalHeader>
       
        <ModalBody>
        <div
            style={{
              borderRadius: 10,
              height: "auto",
              background: "#ebebeb",
              padding: "10px",
            }}
          >
            <Row>
              <Col md={5}>
                <span style={{ fontWeight: 500 }}>Job Number : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {jobInfo?.jobNumber || ""}
                </span><br/>
                <span style={{ fontWeight: 500 }}>Service Type : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {jobInfo?.jobName|| ""}
                </span>
              </Col>
              <Col md={7}>
              <span style={{ fontWeight: 500 }}>Customer : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {jobInfo.customer?.name || ""}
                </span>
               
              </Col>
            </Row>
          </div>

          {props.children}</ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
         
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default JobModal;
