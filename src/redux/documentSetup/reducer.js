import { DocumentSetupActionTypes } from "./actions";

const { GET_ALL_DOCUMENT, ADD_NEW_DOCUMENT, SHOW_MODAL, GET_DOCUMENT_TYPE, SHOW_LOADER,SET_SEARCH_RESULT,SET_DOCUMENT } = DocumentSetupActionTypes;

const initialState = {
  documents: [],
  showModal: false,
  documentTypes: [],
  document:{code:"", name: "", description: "", docType: "", status: "" },
  isLoading: true,
  isEdit:true
};

const DocumentSetupReducer = function (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      {
        return {
          ...state,
          isLoading: true
        };
      }
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: !state.showModal
        };
      }
    case GET_DOCUMENT_TYPE:
      {
        return {
          ...state,
          documentTypes: [...action.payload]
        };
      }
    case GET_ALL_DOCUMENT:
      {
        return {
          ...state,
          documents: [...action.payload],
          showModal: false,
          isLoading: false
        };
      }
    case ADD_NEW_DOCUMENT:

      {
        return {
          ...state,
          documents: [...action.payload],
          showModal: false
        };
      }
    case SET_SEARCH_RESULT:

      {
        return {
          ...state,
          documents: [...action.payload],
        };
      }

      case SET_DOCUMENT:

        {
          return {
            ...state,
            document: action.payload,
           
          };
        }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default DocumentSetupReducer;
