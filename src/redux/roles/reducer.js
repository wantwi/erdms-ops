import { RolesSetupActionTypes } from "./action";



const {GET_ALL_ROLES,SET_ROLE,SET_SEARCH_RESULT,SHOW_MODAL, } = RolesSetupActionTypes;

const initRole = {
    code: "",
    name: "",
    description: "",
    status: true,
   
  };

const initialState = {
    roles: [],
  showModal: false,
  role:initRole,
 
 
};

const RoleSetupReducer = function (state = initialState, action) {
  switch (action.type) {
   
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: action.payload
        };
      }
  
    case GET_ALL_ROLES:
      {
        return {
          ...state,
          roles: [...action.payload],
          showModal: false,
       
        };
      }
   
    case SET_SEARCH_RESULT:

      {
        return {
          ...state,
          roles: [...action.payload],
        };
      }

      case SET_ROLE:

        {
          return {
            ...state,
            equipment: action.payload,
           
          };
        }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default RoleSetupReducer;
