import { RequirementSetupActionTypes } from "./actions";

const {
  ADD_NEW_REQUIREMENT,
  GET_ALL_REQUIREMENT,
  SHOW_MODAL,
  GET_REQUIRMENT_ACTIONS,
  GET_REQUIRMENT_TYPES,
  SET_REQUIREMENT,
  SET_SEARCH_RESULT
} = RequirementSetupActionTypes;

const initialState = {
  requirements: [],
  showModal: false,
  requirementTypes: [],
  requirementActions: [],
  requirement: {
    code: "",
    name: "",
    requirementTypeId: "",
    requirementAction: "",
    regulatoryOptionId:"",
    documentId: "",
    status: ""
  }
};

const RequirementSetupReducer = function (state = initialState, action) {
  
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    case GET_ALL_REQUIREMENT: {
      return {
        ...state,
        requirements: [...action.payload],
        showModal: false,
      };
    }
    case ADD_NEW_REQUIREMENT: {
      return {
        ...state,
        requirements: [...action.payload],
        showModal: false,
      };
    }

    case GET_REQUIRMENT_ACTIONS: {
      return {
        ...state,
        requirementActions: [...action.payload],
      };
    }
    case GET_REQUIRMENT_TYPES: {
      return {
        ...state,
        requirementTypes: [...action.payload],
      };
    }
    case SET_REQUIREMENT:

      {
        return {
          ...state,
          requirement: action.payload,

        };
      }
      case SET_SEARCH_RESULT:

        {
          return {
            ...state,
            requirements: [...action.payload],
          };
        }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default RequirementSetupReducer;
