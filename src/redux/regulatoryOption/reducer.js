import { EquipmentSetupActionTypes } from "./action";



const {GET_ALL_REGULATORY_OPTION,SET_REGULATORY_OPTION,SET_SEARCH_RESULT,SHOW_MODAL, } = EquipmentSetupActionTypes;

const initialSate = {
    code: "",
    name: "",
    description: "",
    status: true,
    regulatoryOptionId:""
  };

const initialState = {
   regulatoryOptions: [],
  showModal: false,
 regulatoryOption:initialSate,
 
 
};

const RegulatoryOptionReducer = function (state = initialState, action) {
  switch (action.type) {
   
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: action.payload
        };
      }
  
    case GET_ALL_REGULATORY_OPTION:
      {
        return {
          ...state,
         regulatoryOptions: [...action.payload],
          showModal: false,
       
        };
      }
   
    case SET_SEARCH_RESULT:

      {
        return {
          ...state,
         regulatoryOptions: [...action.payload],
        };
      }

      case SET_REGULATORY_OPTION:

        {
          return {
            ...state,
           regulatoryOption: action.payload,
           
          };
        }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default RegulatoryOptionReducer;
