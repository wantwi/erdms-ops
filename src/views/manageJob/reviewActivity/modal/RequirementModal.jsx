import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col, Row } from "reactstrap";
import { useSelector,useDispatch } from "react-redux";
import { showMessageDialog } from "redux/messages/action";

const RequirementModal = (props) => {
  const dispatch =useDispatch()
  const { openModal, setOpenModal,  activityInfo,handleDecline,handleApprove } = props;

  const { jobMessages } = useSelector((state) => state.jobmessagesState);

  console.log({ jobMessages });

  

  const showMessageDialogEvent =()=>{
      dispatch(showMessageDialog(true))
  }


  console.log({ activityInfo });
  return (
    <div>
      {" "}
      <Modal isOpen={openModal} size="lg">
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900, fontSize: "18px" }}>
            Activity Requirement
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
                <span style={{ fontWeight: 500 }}>Activity : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {activityInfo?.activityName || ""}
                </span><br/>
                <span style={{ fontWeight: 500 }}>Squence Number : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {activityInfo?.sequence || ""}
                </span><br/>
                <span style={{ fontWeight: 500 }}>Duration : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {activityInfo?.tat +" Days" || ""}
                </span>
              </Col>
              <Col md={7}>
                <div
                  style={{
                    background: "#e1e2e3",
                    padding: "10px 10px",
                    borderRadius: 10,
                  }}
                >
                  <label className="mr-1">Job Number : </label>
                  <span> {activityInfo?.jobNumber || ""}</span>
                  <br />
                  <label className="mr-1">Customer : </label>
                  <span> {activityInfo?.customerName || ""}</span>
                 
                </div>
              </Col>
            </Row>
          </div>

          {props.children}
        </ModalBody>
        <ModalFooter>
        <div  onClick={showMessageDialogEvent} style={styles.message_wrap} className="pl-10 btn btn-primary">
              <button style={styles.msgBtn} className="top-header-icon">
                <i className="fa fa-comment-alt text-white"></i>
                <div style={styles.badge} className="button-badge  fs-11 demi-bold-text text-white"></div>
              </button>
            </div>

          <Button className="c-secondary"  size="md" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button
            className="c-danger"
            size="md"
            onClick ={handleDecline}
            
          >
            Decline
          </Button>{" "}
          <Button
            className="c-primary"
            size="md"
            onClick ={handleApprove}
          >
            Approved
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RequirementModal;
const styles = {
  foot_wrap: {
    position: "absolute",
    boxShadow: "0 15px 15px -5px rgba(0, 0, 0, 0.2)",
    left:"10px"
  },
  message_wrap:{
    position:"absolute",
    left:20
  },
  msgBtn:{
    border:"none",
    position:"relative",
    background:"none"

  },
  badge:{
    position:"absolute",
    top: 0,
    right: "-5px",
  }
};