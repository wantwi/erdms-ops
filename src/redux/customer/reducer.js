import { CustomerActionTypes } from "./actions";

const {
  // ADD_NEW_CUSTOMER,
  GET_ALL_CUSTOMERS,
  SET_CUSTOMER,
  GET_INDUSTRIES,
  GET_POSITION,
  IS_EDIT,
  SET_SEARCH_RESULT
} = CustomerActionTypes;

const initialState = {
  customers: [],
  customer: {
    code:"",
    name: "",
    industryId: "",
    taxExempt: false,
    exemptionLetterPath: "",
    file: "",
    issuedAt: "",
    expiredAt: "",
    issuingAuthority: "",
    signedBy: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    digitalAddress: "",
    contactPerson: {
      firstName: "",
      lastName:"",
      positionId: "",
      phone1: "",
      phone2: "",
      email: "",
      address: "",
    },
  },
  industries: [],
  positions: [],
  isEdit: false,
};

const CustomerReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CUSTOMERS: {
      return {
        ...state,
        customers: [...action.payload],
      };
    }
    case SET_CUSTOMER: {
      return {
        ...state,
        customer: action.payload,
      };
    }
    case GET_INDUSTRIES: {
      return {
        ...state,
        industries: [...action.payload],
      };
    }
    case GET_POSITION: {
      return {
        ...state,
        positions: [...action.payload],
      };
    }
    case IS_EDIT: {
      return {
        ...state,
        isEdit:action.payload,
      };
    }
    case SET_SEARCH_RESULT:

      {
        return {
          ...state,
          customers: [...action.payload],
        };
      }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default CustomerReducer;
