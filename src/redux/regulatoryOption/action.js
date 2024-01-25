import axios from "axios";
import {
  hideLoader,
  showLoader,
  setResponse,
  setEditMode
} from "redux/loader/Loader";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";


export const EquipmentSetupActionTypes = {
  GET_ALL_REGULATORY_OPTION: "GET_ALL_REGULATORY_OPTION",
  SHOW_MODAL: "SHOW_MODAL",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  SET_REGULATORY_OPTION: "SET_REGULATORY_OPTION"
};

const {
  GET_ALL_REGULATORY_OPTION,
  SHOW_MODAL,
  SET_SEARCH_RESULT,
  SET_REGULATORY_OPTION
} = EquipmentSetupActionTypes;

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



export const getAllRegulatoryOptions = () => async dispatch => {
  dispatch(showLoader());
  try {
    const docs = await CustomAxios.get(
     `RegulatoryOptions?results=1000`
    );

  console.log({docs})

    dispatch({
      type: GET_ALL_REGULATORY_OPTION,
      payload:docs.data.items
    });
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true))
};

export const addNewRegulatoryOptions = newdata => async dispatch => {
  dispatch(showLoader());


  try {
    const docs = await CustomAxios.post(
     `RegulatoryOptions`,
      newdata
    );
   

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Regulatory option added successfully", true));
      dispatch(getAllRegulatoryOptions());
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
     `RegulatoryOptions?filter=${textValue}`
    );

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    });

    console.log({ result });
  }, 200);

  Search();
};

export const getSelectedRegulatoryOptions = data => async dispatch => {
 
    dispatch(showLoader());
 

  dispatch({
    type: SET_REGULATORY_OPTION,
    payload: data
  });

  dispatch(hideLoader());
};

export const updateRegulatoryOptions = newdata => async dispatch => {
  dispatch(showLoader());

  try {
    const docs = await CustomAxios.put(
     `RegulatoryOptions`,
      newdata
    );

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Regulatory option updated successfully", true));
      dispatch(getAllRegulatoryOptions());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const deleteRegulatoryOptions = newdata => async dispatch => {
  dispatch(showLoader());
 
  // console.log({newDoc})

  // return
  try {
    const docs = await CustomAxios.delete(
     `RegulatoryOptions`,
      { data: { regulatoryOptionId: newdata.id } },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    if (docs) {
      dispatch(setResponse("Regulatory option deleted successfully", true));
      dispatch(getAllRegulatoryOptions());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};
