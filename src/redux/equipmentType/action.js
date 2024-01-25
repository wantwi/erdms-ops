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
  GET_ALL_EQUIPMENT: "GET_ALL_EQUIPMENT",
  SHOW_MODAL: "SHOW_MODAL",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  SET_EQUIPMENT: "SET_EQUIPMENT"
};

const {
  GET_ALL_EQUIPMENT,
  SHOW_MODAL,
  SET_SEARCH_RESULT,
  SET_EQUIPMENT
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



export const getAllEquipments = () => async dispatch => {
  dispatch(showLoader());
  try {
    const docs = await CustomAxios.get(
      `Equipments/Type?results=1000`
    );

    dispatch({
      type: GET_ALL_EQUIPMENT,
      payload:docs.data.items
    });
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true))
};

export const addNewEquipment = newdata => async dispatch => {
  dispatch(showLoader());


  try {
    const docs = await CustomAxios.post(
      `Equipments/Type`,
      newdata
    );
   

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Equipment type added successfully", true));
      dispatch(getAllEquipments());
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
      `Equipments/Type?filter=${textValue}`
    );

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    });

    console.log({ result });
  }, 200);

  Search();
};

export const getSelectedEquipment = data => async dispatch => {
 
    dispatch(showLoader());
 

  dispatch({
    type: SET_EQUIPMENT,
    payload: data
  });

  dispatch(hideLoader());
};

export const updateEquipment = newdata => async dispatch => {
  dispatch(showLoader());

  try {
    const docs = await CustomAxios.put(
      `Equipments/Type`,
      newdata
    );

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Equipment type updated successfully", true));
      dispatch(getAllEquipments());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const deleteEquipment = newdata => async dispatch => {
  dispatch(showLoader());
 
  // console.log({newDoc})

  // return
  try {
    const docs = await CustomAxios.delete(
      `Equipments/Type`,
      { data: { equipmentTypeId: newdata.id } },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    if (docs) {
      dispatch(setResponse("Equipment type deleted successfully", true));
      dispatch(getAllEquipments());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};
