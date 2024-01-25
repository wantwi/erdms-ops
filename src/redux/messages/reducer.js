import {MessageActionTypes} from "./action"

const { SHOW_MESSAGE_DIALOG, GET_JOB_MESSAGES, SET_HEADER_INFO, ADD_NEW_MESSAGE, CHATHUB_CONNECTION, LEAVE_CHAT_ROOM } = MessageActionTypes;

const initialState = {
    showDialog: false,
    jobMessages: [],
    headerInfo:{},
    signalConnection:null,
    isLoading:true
}

const JobMessageReducer = function(state = initialState, action) {

    switch (action.type) {
        case GET_JOB_MESSAGES: {
            return {
              ...state,
              jobMessages: [...action.payload],
              isLoading:false
            };
          }
          case ADD_NEW_MESSAGE: {
            return {
              ...state,
              jobMessages: [...state.jobMessages,action.payload],
            };
          }
        case SHOW_MESSAGE_DIALOG: {
            return {
              ...state,
              showDialog: action.payload,
            };
          }
          case SET_HEADER_INFO: {
            return {
              ...state,
              headerInfo: action.payload,
            };
          }
        case LEAVE_CHAT_ROOM:
          return {
            ...state,
            jobMessages: [],
            isLoading:true
          };

        case CHATHUB_CONNECTION:
          return {
            ...state,
            signalConnection: action.payload,
          };
        default: {
            return {
              ...state,
            };
          }
    }




}


export default JobMessageReducer;