import useCustomApi from "api/useCustomApi";
import { useGetById } from "hooks/useQueryInfo";
import React, { useEffect, useState } from "react";
// import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  // Badge,
} from "reactstrap";
import { showMessageDialog } from "redux/messages/action";
// import { CustomAxios } from "util/customAxios";
import OtherDocumnetForm from "../form/OtherDocumnetForm";


// const { REACT_APP_SERVICE_URL } = process.env;

// const accessToken =  localStorage.getItem("access_token");

// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;


const RequirementModal = (props) => {
  const customApi = useCustomApi();
  const dispatch = useDispatch();
  const {
    openModal,
    setOpenModal,
    // info,
    // title,
    activityInfo,
    otherDocumnets, 
    setOtherDocumnets,
    sendForReviewEvent,
  } = props;


  const [show, setShow] = useState(false)
  // const { jobMessages } = useSelector((state) => state.jobmessagesState);

  const  showOtherDocument = () =>{
    setShow(true)
 
  }
  

  const showMessageDialogEvent = () => {
    dispatch(showMessageDialog(true));
  };

  const GetAssignedInstruction =async () =>{
    const response = await customApi.get(`Job/${activityInfo?.id}/JobActivityAssigmentDetails`)
    return response.data

  }

  const onSuccess =()=>{

  }
  const onError =()=>{

  }

   const {data, refetch} =  useGetById("instruction",activityInfo?.id,GetAssignedInstruction, onSuccess,onError)

   
   useEffect(() => {
     
    if(activityInfo?.id){
      refetch()
    }
   
    
   }, [activityInfo])

  return (
    <div>
      {" "}
      <Modal isOpen={openModal} size="xl">
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
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>Squence Number : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {activityInfo?.sequence || ""}
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>Duration : </span>
                <span style={{ fontWeight: 500, color: "#5C258D" }}>
                  {activityInfo?.tat + " Days" || ""}
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

          <div
          className="mt-1"
          style={{
            borderRadius: 10,
            height: "auto",
            background: "rgb(67 137 162)",
            padding: "5px 20px",
            color:"#ffffff",
            textAlign:"justify"
          }}
        >
          
            <span style={{fontWeight: 500,fontSize:18}}><i className="fa fa-1x fa-comments "></i> Specific Instruction: </span>
            
         
          <span>
            {
               data ? data?.remarks.length > 0 ? data?.remarks : "No specific instruction" :  null
            }
            
          </span>
        </div>


          {props.children}
        </ModalBody>
        <ModalFooter>
          <div className={styles.foot_wrap}>
            <div
              onClick={showMessageDialogEvent}
              style={styles.message_wrap}
              className="pl-10 btn btn-primary"
            >
              <button style={styles.msgBtn} className="top-header-icon">
                <i className="fa fa-comment-alt text-white"></i>
                <div
                  style={styles.badge}
                  className="button-badge  fs-11 demi-bold-text text-white"
                ></div>
              </button>
             
            </div>
            <Button style={styles.badgeInfo} className="pa-7 c-info" onClick={showOtherDocument} >Other Documents <span style={styles.countBadge}> {otherDocumnets.length}</span></Button>

            <Button className="c-secondary" onClick={() => setOpenModal(false)}>
              Close
            </Button>
            <span style={{ marginLeft: 15 }}></span>
            <Button className="c-primary" onClick={sendForReviewEvent}>
              Done
            </Button>
          </div>

          {/* <Button
            className="c-primary"
            size="sm"
            //   onClick={handleClickEvent}
          >
            Add
          </Button>{" "} */}
        </ModalFooter>
      </Modal>

      <OtherDocumnetForm activityInfo={activityInfo} setOtherDocumnets={setOtherDocumnets} otherDocumnets={otherDocumnets} show={show} setShow={setShow} />
    </div>
  );
};

export default RequirementModal;

const styles = {
  foot_wrap: {
    position: "relative",
    boxShadow: "0 15px 15px -5px rgba(0, 0, 0, 0.2)",
  },
  message_wrap: {
    position: "absolute",
    left: 20,
  },
  msgBtn: {
    border: "none",
    position: "relative",
    background: "none",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: "-5px",
  },
  badgeInfo:{
    position: "absolute",
    left: "80px",
  },
  countBadge:{
    background:"#f1f1f1",
    padding:"4px 8px",
    borderRadius: "20px",
    color:"black",
    fontWeight:"bold"
  }
};
