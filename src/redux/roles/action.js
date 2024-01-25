import axios from "axios";
import {
  hideLoader,
  showLoader,
  setResponse,
  setEditMode
} from "redux/loader/Loader";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";


export const RolesSetupActionTypes = {
  GET_ALL_ROLES: "GET_ALL_ROLES",
  SHOW_MODAL: "SHOW_MODAL",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  SET_ROLES: "SET_ROLES"
};

const {
  GET_ALL_ROLES,
  SHOW_MODAL,
  SET_SEARCH_RESULT,
  SET_ROLES
} = RolesSetupActionTypes;

let data = [];




export const toggleModal = (state =false) => async dispatch => {
    try {
      dispatch({
        type: SHOW_MODAL,
        payload:state
      });
    } catch (error) {
      console.log({ error });
    }
  };



export const getAllRoles = () => async dispatch => {
  dispatch(showLoader());
  try {
    const docs = await CustomAxios.get(
      `Roles?results=1000`
    );

    dispatch({
      type: GET_ALL_ROLES,
      payload:docs.data.items
    });
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true))
};

export const addNewRoles = newdata => async dispatch => {
  dispatch(showLoader());


  //delete newdata.code

  
  try {
    const docs = await CustomAxios.post(
      `Roles`,
     {...newdata,status: newdata.status === true ? 1 : 0
     }
    );
   

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Role added successfully", true));
      dispatch(getAllRoles());
      dispatch(hideLoader());
    }
  } catch (error) {
   
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};


export const handleSearch = textValue => async dispatch => {
  const Search = debounce(async () => {
    const result = await CustomAxios.get(
      `Roles?filter=${textValue}`
    );

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    });

    console.log({ result });
  }, 200);

  Search();
};

export const getSelectedRole = data => async dispatch => {
 
    dispatch(showLoader());
 

  dispatch({
    type: SET_ROLES,
    payload: data
  });

  dispatch(hideLoader());
};

export const updateRole = newdata => async dispatch => {
  dispatch(showLoader());

 // delete newdata.code

  try {
    const docs = await CustomAxios.put(
      `Roles`,
      {...newdata,status: newdata.status === true ? 1 : 0}
    );

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Role updated successfully", true));
      dispatch(getAllRoles());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const deleteRole = newdata => async dispatch => {
  dispatch(showLoader());
 
  // console.log({newDoc})

  // return
  try {
    const docs = await CustomAxios.delete(
      `Roles`,
      { data: { roleId: newdata.id } },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    if (docs) {
      dispatch(setResponse("Role deleted successfully", true));
      dispatch(getAllRoles());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};
