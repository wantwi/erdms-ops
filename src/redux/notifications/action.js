import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { CustomAxios } from "util/customAxios";

export const NotificatioActionType = {
  OPEN_CONNECTION: "OPEN_CONNECTION",
  GET_CONNECTION: "GET_CONNECTION",
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  NEW_NOTIFICATION: "NEW_NOTIFICATION",
};

const {
  GET_NOTIFICATIONS,
  OPEN_CONNECTION,
  NEW_NOTIFICATION,
} = NotificatioActionType;

const { REACT_APP_SERVICE_URL,REACT_APP_SESSIONURL } = process.env;
const sessionData = JSON.parse(
  sessionStorage.getItem(REACT_APP_SESSIONURL)
);

const hubConnectionOptions = {
  logging: LogLevel.Trace,
  accessTokenFactory: () => `${sessionData?.access_token || null}`,
};




const getUnreadMessage = () => async (dispatch) => {
  try {
    const response = await CustomAxios.get("Notifications");
    if (response) {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: response.data,
      });
    }
  } catch (err) {}
};

export const updateNotification = (reference) => async (dispatch) => {
  try {
    const response = await CustomAxios.put("Notifications/read", {
      notificationType: "Job",
      reference,
    });

    if (response) {
      dispatch(getUnreadMessage());
    }
  } catch (error) {
    console.log({ error });
  }
};

export const getAllUnreadMessages = (data) => async (dispatch) => {
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: data,
  });
  
};

export const startConnection = () => (dispatch) => {
  if (sessionData?.access_token) {
  }
};


export const setUnreadMessage = (data) => async (dispatch) => {
 
   
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: data,
      });
    
 
};

export const onNotify = (data) => async (dispatch) =>{
  dispatch({
    type: NEW_NOTIFICATION,
    payload: data,
  });
}

