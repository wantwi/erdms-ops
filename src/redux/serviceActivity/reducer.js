import { ServiceActitvityActionTypes } from "./actions";

const {SET_ACTYIVITY,SET_SEARCH_RESULT, ADD_NEW_SERVICEACTIVITY,GET_ALL_SERVICEACTIVITY,SHOW_MODAL,GET_ALL_PROCESSOWNER,GET_ALL_ACTIVITY_TYPES } = ServiceActitvityActionTypes;

const initialState = {
  serviceActities: [],
  serviceactivity:{},
  showModal:false,
  owners:[],
  activitytypes:[]
};

const ServiceActityReducer = function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: !state.showModal
        };
      }
      case GET_ALL_ACTIVITY_TYPES:
        {
          return {
            ...state,
            activitytypes: [...action.payload]
          };
        }
        case GET_ALL_PROCESSOWNER:
          {
            return {
              ...state,
              owners: [...action.payload]
            };
          }
    case GET_ALL_SERVICEACTIVITY:
      {
        return {
          ...state,
          serviceActities: [...action.payload],
          showModal:false
        };
      }
      case ADD_NEW_SERVICEACTIVITY:

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
              serviceActities: [...action.payload],
            };
          }
          case SET_ACTYIVITY:

            {
              return {
                ...state,
                serviceactivity: action.payload,
               
              };
            }
    

    default: {
      return {
        ...state,
      };
    }
  }
};

export default ServiceActityReducer;
