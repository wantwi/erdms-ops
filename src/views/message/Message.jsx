import React, { useState, useEffect, useRef } from "react";
import "./message.styles.css";
import { MdClose } from "react-icons/md";
import Bubble from "./bubble/Bubble";
import { useSelector, useDispatch } from "react-redux";
import {
  showMessageDialog,
  renderMessages,
} from "redux/messages/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Moment from "react-moment";
import {
  HubConnectionBuilder
} from "@aspnet/signalr";
import { getAllUnreadMessages, setUnreadMessage, updateNotification } from "redux/notifications/action";
import useAuth from "hooks/useAuth";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
import { usePut } from "hooks/useMutateInfo";

const { REACT_APP_SERVICE_URL } = process.env;

const Message = () => {
  const {auth} = useAuth()

  
  let connection = useRef(new HubConnectionBuilder()
  .withUrl(`${REACT_APP_SERVICE_URL}chatHub`, {
    accessTokenFactory: () => `${auth?.accessToken || null}`,
  })
  .build()) 



  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const divRef = useRef(null);
  const [textmessage, setTextmessage] = useState("");
  const [jobMessages2, setJobMessages2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const customApi = useCustomApi();
  const { headerInfo } = useSelector(
    (state) => state.jobmessagesState
  );

  console.log({headerInfo})

  const PutData = async () => {
   const reference =  headerInfo?.jobId
    const response =  await customApi.put(`Notifications/read`, {
      notificationType: "Job",
      reference,
    })

    if(response?.status === 204){
      GetUnreadMessages()
    }

    console.log({PutData:response})

   // return response.data

  }

  const GetUnreadMessages = async () => {
    const response = await customApi.get("Notifications");

    dispatch(getAllUnreadMessages(response?.data))
  }




  const join = (room) =>
    connection.current
      .start()
      .then(() => connection.current.invoke("JoinRoom", { room }))
      .then((history) => {
      

        setJobMessages2(renderMessages(history,auth));
        setTimeout(() => {
          
        }, 3000);

        connection.current.on("receive_message", (message) => {

       
         // putData()

          setJobMessages2((state) => [...state, renderMessages([message],auth)[0]]);

      
          //dispatch(updateNotification(room))
        });

        setIsLoading(false);
      })
      .catch(function(err) {
        return console.error(err.toString());
      });


  const leave = (jobId) =>
  connection.current.send("LeaveRoom", { room: jobId }).then(() => {
    connection.current.off("receive_message");
      return connection.current.stop();
    });

 

  const handleChange = (e) => {
    setTextmessage(e.target.value);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      if (textmessage.length > 0 || textmessage !== "") {
        sendMessageEvent();
      }
    }
  };


  const sendMessageEvent = () => {
   
    let data = {};

    let message = {};

    message.message = textmessage;
    message.organization = "Company";
    message.room = headerInfo.jobId;
    message.subroom = "3fa85f64-5717-4562-b3fc-2c963f66afa6"

    data.jobId = headerInfo.jobId;
    data.message = textmessage;
   

    connection.current.send("SendMessage", message).catch(function(err) {
      return console.error(err.toString());
    });


    data.side = "right";
    data.name="you"
    data.date = (
      <Moment fromNow ago>
        {Date.now()}
      </Moment>
    );

    setJobMessages2((state) => [...state, data]);
    setTextmessage("");
    //putData()
    // dispatch(updateNotification(headerInfo.jobId))
  };

  const showMessageDialogEvent = () => {
    dispatch(showMessageDialog(false));
  };
  
  
  useEffect(() => {
    setTimeout(() => {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);  
  }, [])
  


  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [jobMessages2])
  


  useEffect(() => {
    if(auth?.accessToken){
      join(headerInfo?.jobId);
      PutData()
      
    }
   
   // dispatch(updateNotification(headerInfo?.jobId))
    return () => {
      setJobMessages2([]);
      leave(headerInfo?.jobId);
    };
  }, []);

  const SekletonLoader = () => {
    return (
      <>
        <Skeleton
          baseColor="#e1e2e3"
          style={{
            borderRadius: "15px",
            borderBottomRightRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "right",
          }}
          className="msg-bubble right-msg"
        />
        <Skeleton
          baseColor="#bac8dc"
          style={{
            borderRadius: "15px",
            borderBottomLeftRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "left",
          }}
          className="msg-bubble left-msg"
        />
        <Skeleton
          baseColor="#e1e2e3"
          style={{
            borderRadius: "15px",
            borderBottomRightRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "right",
          }}
          className="msg-bubble right-msg"
        />
        <Skeleton
          baseColor="#bac8dc"
          style={{
            borderRadius: "15px",
            borderBottomLeftRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "left",
          }}
          className="msg-bubble left-msg"
        />
        <Skeleton
          baseColor="#e1e2e3"
          style={{
            borderRadius: "15px",
            borderBottomRightRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "right",
          }}
          className="msg-bubble right-msg"
        />
        <Skeleton
          baseColor="#bac8dc"
          style={{
            borderRadius: "15px",
            borderBottomLeftRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "left",
          }}
          className="msg-bubble left-msg"
        />
        <Skeleton
          baseColor="#e1e2e3"
          style={{
            borderRadius: "15px",
            borderBottomRightRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "right",
          }}
          className="msg-bubble right-msg"
        />
        <Skeleton
          baseColor="#bac8dc"
          style={{
            borderRadius: "15px",
            borderBottomLeftRadius: 0,
            height: "50px",
            marginTop: 10,
            float: "left",
          }}
          className="msg-bubble left-msg"
        />
      </>
    );
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <div className="image">
          <i className="fas fa-comment-alt"></i>
        </div>
        <div className="name">
          <h5>{headerInfo?.customerName || ""}</h5>
        </div>
        <div className="action" onClick={showMessageDialogEvent}>
          <MdClose />
        </div>
      </div>
      <div className="header-wrap">
        <span className="jobNum">
          Job Number: {headerInfo?.jobNumber || ""}
        </span>
        {/* <span className="jobName"> Job Name </span> */}
      </div>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 1 }, "doc-title")}
            onClick={() => {
              toggle(1);
            }}
          >
            External
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 2 }, "doc-title")}
            onClick={() => {
              toggle(2);
            }}
          >
            Internal
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <main  className="main" >
            {isLoading ? (
              <SekletonLoader />
            ) : jobMessages2.length > 0 ? (
              jobMessages2.map((x, i) => <Bubble key={i} {...x} />)
            ) : (
              "No message for this job"
            )}
            <div ref={divRef}/>
          </main>
        </TabPane>
        {/* <TabPane tabId={2}>
          <main className="main" ></main>

          <Skeleton   baseColor="#e1e2e3" style={{borderRadius: '15px',borderBottomRightRadius: 0, height:'50px'}} className="msg-bubble right-msg" />
            <Skeleton   baseColor="#e1e2e3" style={{borderRadius: '15px',borderBottomRightRadius: 0, height:'50px'}} className="msg-bubble left-msg" />
        </TabPane> */}
      </TabContent>

      <footer className="footer">
        <div className="attachBtn">
          <button type="button" className=" btn btn-sm ">
            <i id="uploadFile" className="fas fa-paperclip"></i>
          </button>
        </div>
        <div className="inputText">
          <input
            onKeyPress={onKeyPress}
            className="form-control"
            value={textmessage}
            onChange={handleChange}
            placeholder="message"
          />
        </div>
        <div>
          <button
            disabled={textmessage.length > 0 ? false : true}
            className="attachBtn btn btn-sm btn-success"
            onClick={sendMessageEvent}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Message;
