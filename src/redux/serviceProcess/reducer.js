import { ServiceProcessActionTypes } from "./actions";

const {SET_SEARCH_RESULT,SET_PROCESS, ADD_NEW_SERVICE_PROCESS,GET_ALL_PROCESSOWNER,GET_ALL_PROCESS_TYPES,GET_ALL_SERVICE_PROCESS, SHOW_MODAL } = ServiceProcessActionTypes;

const initialState = {
  serviceprocess: [],
  showModal:false,
  processowners:[],
  processtypes:[],
  process:{
    id:"",
    code:"",
    name:"",
    description:"",
    status:"",
    processType:"",
    activities:[],
    processOwner:[]
}}

const ServiceProcessReducer = function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: !state.showModal
        };
      }
      case GET_ALL_PROCESS_TYPES:
        {
          return {
            ...state,
            processtypes: [...action.payload]
          };
        }
        case GET_ALL_PROCESSOWNER:
          {
            return {
              ...state,
              processowners: [...action.payload]
            };
          }
    case GET_ALL_SERVICE_PROCESS:
      {
        return {
          ...state,
          serviceprocess: [...action.payload],
          showModal:false
        };
      }
      case ADD_NEW_SERVICE_PROCESS:

        {
          return {
            ...state,
            serviceActities: [...action.payload],
            showModal:false
          };
        }


        case SET_SEARCH_RESULT:

          {
            return {
              ...state,
              serviceprocess: [...action.payload],
            };
          }
  
          case SET_PROCESS:

          {
            return {
              ...state,
              process: action.payload,
            };
          }
             

    default: {
      return {
        ...state,
      };
    }
  }
};

export default ServiceProcessReducer;
