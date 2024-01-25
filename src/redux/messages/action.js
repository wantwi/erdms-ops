
import React from "react";
import Moment from "react-moment";
import { CustomAxios } from "util/customAxios";
import {
  HubConnectionBuilder,
  LogLevel,
} from "@aspnet/signalr";
import jwt from "jsonwebtoken"

export const MessageActionTypes = {
  SHOW_MESSAGE_DIALOG: "SHOW_MESSAGE_DIALOG",
  GET_JOB_MESSAGES: "GET_JOB_MESSAGES",
  SET_HEADER_INFO: "SET_HEADER_INFO",
  ADD_NEW_MESSAGE: "ADD_NEW_MESSAGE",
  CHATHUB_CONNECTION:"CHATHUB_CONNECTION",
  LEAVE_CHAT_ROOM:"LEAVE_CHAT_ROOM"
};

const {
  SHOW_MESSAGE_DIALOG,
  GET_JOB_MESSAGES,
  SET_HEADER_INFO,
  CHATHUB_CONNECTION,
  ADD_NEW_MESSAGE,
  LEAVE_CHAT_ROOM
} = MessageActionTypes;



const {REACT_APP_SERVICE_URL} = process.env
const sessionData =null

const hubConnectionOptions = {
  logging: LogLevel.Trace,
 accessTokenFactory:  ()  => `${sessionData?.access_token || null}` 
 
};

const connection = new HubConnectionBuilder()
    .withUrl(`${REACT_APP_SERVICE_URL}chatHub`, hubConnectionOptions)
    .configureLogging(LogLevel.Debug)
    .build();



export const showMessageDialog = (state) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_MESSAGE_DIALOG,
      payload: state,
    });
  } catch (error) {}
};

export const getJobMessages = ({jobId, customerId}) => async (dispatch) => {

  console.log({jobId, customerId})
  try {
    const request = await CustomAxios.get(`Messaging`, {
      params: {
        jobId,
        customerId,
        results: 1000000000,
      },
    });

    console.log({ request });

    if (request) {
      // dispatch({
      //   type: GET_JOB_MESSAGES,
      //   payload: renderMessages(request.data.items),
      // });
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-job-manager/login";
    }
  }
};

export const setJobHeaders = (data) => async (dispatch) => {
  dispatch({
    type: SET_HEADER_INFO,
    payload: data,
  });
};

export const sendMessage = (data) => async (dispatch) => {
  try {
    let mess = {};
    mess.organinzation = "Company";
    mess.jobId = data.jobId;
    mess.messageText = data.message;
    mess.fileReferenceId = "";


    const request = await CustomAxios.post(
      `Messaging/SendMessage/External`,
      mess
    );
    if (request) {
      console.log({ saveMgs: request });
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-job-manager/login";
    }
  }
};


export const startChatConnection = () =>(dispatch)=>{

  connection.start().then(()=>{
    console.log("connection started...");

    dispatch({
        type: CHATHUB_CONNECTION,
        payload:connection
    })
  })
}


export const leaveChatRoom =(room)=>(dispatch)=>{

  connection.send("LeaveRoom", { room }).then(() => {
    connection.off("receive_message");

    dispatch({
        type:LEAVE_CHAT_ROOM,
          
       })
   
    return connection.stop();
  });


}



export const joinChat = (room)=>(dispatch)=>{
  connection
  .start()
  .then(() => connection.invoke("JoinRoom", { room }))
  .then((history) => {

    
    dispatch({
      type:GET_JOB_MESSAGES,
      payload: renderMessages(history)

    })
    connection.on("receive_message", (message) => {
      console.log({receive_message: message})
       dispatch({
         type:ADD_NEW_MESSAGE,
         payload: renderMessages([message])[0]
       });
      });
  
  })
  .catch(function(err) {
    return console.error(err.toString());
  });


}



export const renderMessages = (data,auth) => {
 
  const {sub} = jwt.decode(auth?.accessToken)
 
  console.log({data,sub})
 
  return data.map((x) => ({ 
    name: x?.userId.toLowerCase() !==sub.toLowerCase() ?  x?.userName.split(' ')[0] :'you',
    message: x?.messageText||x?.message,
    side:  x?.userId.toLowerCase() !==sub.toLowerCase() ?  "left": "right",
    date: (
      <Moment fromNow ago>
        {x?.createdAt ||x?.sentAt}
      </Moment>
    ),
  }));
};


// export const renderMessages = (data,auth) => {
 
//   const {sub} = jwt.decode(auth?.accessToken)
 
 
//   return data.map((x) => ({ 
//     name: x?.userId !==sub ? 'you' : x?.userName.split(' ')[0],
//     message: x?.messageText||x?.message,
//     side:  x?.userId !==sub ?  "right": "left",
//     date: (
//       <Moment fromNow ago>
//         {x?.createdAt ||x?.sentAt}
//       </Moment>
//     ),
//   }));
// };

