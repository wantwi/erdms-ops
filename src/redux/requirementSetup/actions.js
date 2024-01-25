import axios from "axios";
import { hideLoader,showLoader, setResponse } from "redux/loader/Loader";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";

export const RequirementSetupActionTypes = {
  GET_ALL_REQUIREMENT: "GET_ALL_REQUIREMENT",
  ADD_NEW_REQUIREMENT: "ADD_NEW_REQUIREMENT",
  SHOW_MODAL: "SHOW_MODAL",
  GET_REQUIRMENT_TYPES:"GET_REQUIRMENT_TYPES",
  GET_REQUIRMENT_ACTIONS:"GET_REQUIRMENT_ACTIONS",
  SET_SEARCH_RESULT:"SET_SEARCH_RESULT",
  SET_REQUIREMENT:"SET_REQUIREMENT"
};



const {
  GET_ALL_REQUIREMENT,
  ADD_NEW_REQUIREMENT,
  SHOW_MODAL,
  GET_REQUIRMENT_TYPES,
  GET_REQUIRMENT_ACTIONS,
  SET_SEARCH_RESULT,
  SET_REQUIREMENT
} = RequirementSetupActionTypes;

let data = [];



export const toggleModal = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_MODAL,
    });
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  }
};

export const getAllDefaultRequirements = () => async (dispatch) => {
  dispatch(showLoader())
  try {

    const request = await CustomAxios.get(`Requirements/Default?results=1000`)
  

    dispatch({
      type: GET_ALL_REQUIREMENT,
      payload: request.data.items,
    });
   
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response.data.errors[0].message, false));
  
  }
  dispatch(hideLoader())
  setTimeout(()=> dispatch(setResponse("",true)), 5500)
};

export const getAllRequirements = () => async (dispatch) => {
  dispatch(showLoader())
  try {

    const request = await CustomAxios.get(`Requirements?results=1000`)
  

    dispatch({
      type: GET_ALL_REQUIREMENT,
      payload: request.data.items,
    });
   
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response.data.errors[0].message, false));
  
  }
  dispatch(hideLoader())
  setTimeout(()=> dispatch(setResponse("",true)), 5500)
};

export const addNewRequirement = (newdata) => async (dispatch) => {
  dispatch(showLoader())
  try {

      let newRequirement ={}
      newRequirement.code = newdata.code
      newRequirement.name = newdata.name
      newRequirement.documentId = newdata.documentId
      newRequirement.requirementTypeId = newdata.requirementTypeId
      newRequirement.requirementActionId = newdata.requirementAction
      newRequirement.status = newdata.status === "1" ? true : false
      newRequirement.regulatoryOptionId =  newdata?.regulatoryOptionId === "" ? "00000000-0000-0000-0000-000000000000" :  newdata?.regulatoryOptionId
    const request = await CustomAxios.post(`Requirements`, newRequirement)

    if(request){
      dispatch(getAllRequirements())
      dispatch(hideLoader())
      dispatch(toggleModal())
      dispatch(setResponse("Requirement added successfully",true))
    
    }
   

    // dispatch({
    //   type: ADD_NEW_REQUIREMENT,
    //   payload: data,
    // });
  } catch (error) {
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(setResponse("",true))
  dispatch(hideLoader())
};

export const getAllRequirementTypes = () => async (dispatch) => {
  try {
   
    const request = await CustomAxios.get(`Requirements/RequirementTypes?results=1000`)
 

    dispatch({
      type: GET_REQUIRMENT_TYPES,
      payload:request.data,
    });
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  }
};

export const getAllRequirementActions = () => async (dispatch) => {
  try {
   
    const request = await CustomAxios.get(`Requirements/RequirementActions?results=1000`)
   
    dispatch({
      type: GET_REQUIRMENT_ACTIONS,
      payload: request.data,
    });
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  }
};

export const handleSearch =(textValue)=> async(dispatch)=>{

  
  const Search = debounce(async() => {

    const result = await CustomAxios.get(`Requirements?filter=${textValue}`)

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    })
  
      console.log({result})
  
  },200)

  Search()

}

export const getSelectedRequirement  =(data)=> async(dispatch)=>{
  dispatch({
    type: SET_REQUIREMENT,
    payload:data
  })
}

export const updateRequirement = (newdata) => async (dispatch) => {
  let newRequirement ={}
  newRequirement.code = newdata.code
  newRequirement.name = newdata.name
  newRequirement.documentId = newdata.documentId
  newRequirement.requirementTypeId = newdata.requirementTypeId
  newRequirement.requirementActionId = newdata.requirementAction
  newRequirement.status = newdata.status === "1" ? true : false
  newRequirement.requirementId= newdata.id
  newRequirement.regulatoryOptionId = newdata.regulatoryOptionId
  try {

    const docs = await CustomAxios.put(`Requirements`, newRequirement);
    

    if(docs){
      dispatch(toggleModal())
      dispatch(setResponse("Requirement updated successfully",true))
      dispatch(getAllRequirements())
      dispatch(hideLoader())
    }
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  dispatch(setResponse("",true))
};


export const deleteRequirement = (newdata) => async (dispatch) => {
  try {

    const docs = await CustomAxios.delete(`Requirements`, {data : {requirementId:newdata.id}}, { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    }});
   

    if(docs){
      dispatch(toggleModal())
      dispatch(setResponse("Requirement updated successfully",true))
      dispatch(getAllRequirements())
      dispatch(hideLoader())
    }
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  dispatch(setResponse("",true))
};