export const LoaderActionsType ={
    SHOW_LOADER:"SHOW_LOADER",
    HIDE_LOADER:"HIDE_LOADER",
    SET_MESSAGE:"SET_MESSAGE",
    SET_AS_EDIT:"SET_AS_EDIT",
    SET_AS_SAVE:"SET_AS_SAVE"
}

const {HIDE_LOADER, SHOW_LOADER,SET_MESSAGE,SET_AS_EDIT,SET_AS_SAVE} = LoaderActionsType;
const initialState = {
    isLoading: false,
    message:"",
    success:true,
    isEdit:false
}

export const GlobalReducer = function(state = initialState, action) {
    switch (action.type) {
      case SET_MESSAGE:
        {
          return {
            ...state,
            message: action.paylod.message,
            success:action.paylod.success,
          
          };
        }

        case SHOW_LOADER:
            {
              return {
                ...state,
                isLoading: true
              };
            }

        case HIDE_LOADER:
            {
              return {
                ...state,
                isLoading: false
              };
            }
            case SET_AS_EDIT:
              {
                return {
                  ...state,
                  isEdit: true
                };
              }

              case SET_AS_SAVE:
                {
                  return {
                    ...state,
                    isEdit: false
                  };
                }
  
  
      default: {
        return {
          ...state,
        };
      }
    }
  };



  export const showLoader = (message="") => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_LOADER,
        paylod:{}
      });
    } catch (error) {
      console.log({ error });
    }
  };

  export const hideLoader = () => async (dispatch) => {
    try {
      dispatch({
        type: HIDE_LOADER,
      });
    } catch (error) {
      console.log({ error });
    }
  };


  export const setResponse = (message="",success=true) => async (dispatch) => {
    try {
      dispatch({
        type: SET_MESSAGE,
        paylod:{message,success}
      });
    } catch (error) {
      console.log({ error });
    }
  };

  export const setEditMode = () => async (dispatch) => {

    console.log("called!!!")
    try {
      dispatch({
        type: SET_AS_EDIT,
      
      });
    } catch (error) {
      console.log({ error });
    }
  };
  export const setSaveMode = () => async (dispatch) => {
    try {
      dispatch({
        type: SET_AS_SAVE,
      
      });
    } catch (error) {
      console.log({ error });
    }
  };