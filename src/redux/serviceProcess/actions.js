import axios from "axios";
import { debounce } from "lodash";
import { hideLoader,showLoader, setResponse } from "redux/loader/Loader";
import { CustomAxios } from "util/customAxios";

export const ServiceProcessActionTypes = {
  GET_ALL_SERVICE_PROCESS: "GET_ALL_SERVICE_PROCESS",
  ADD_NEW_SERVICE_PROCESS: "ADD_NEW_SERVICE_PROCESS",
  SHOW_MODAL: "SHOW_MODAL",
  GET_ALL_PROCESSOWNER:"GET_ALL_PROCESSOWNER",
  GET_ALL_PROCESS_TYPES:"GET_ALL_ACTIVITY_TYPES",
  SET_SEARCH_RESULT:"SET_SEARCH_RESULT",
  SET_PROCESS:"SET_PROCESS"
};

const {
    GET_ALL_SERVICE_PROCESS,
    ADD_NEW_SERVICE_PROCESS,
  SHOW_MODAL,
  GET_ALL_PROCESSOWNER,
  GET_ALL_PROCESS_TYPES,
  SET_SEARCH_RESULT,
  SET_PROCESS
} = ServiceProcessActionTypes;

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

export const getAllSeviceProcess = () => async (dispatch) => {
  dispatch(showLoader())
  try {
   
    const request = await CustomAxios.get(`Services?results=1000`)

    dispatch({
      type: GET_ALL_SERVICE_PROCESS,
      payload: request.data.items,
    });
    dispatch(setResponse("",true))
  
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response?.data?.errors[0].message, false));
  }
  dispatch(hideLoader())
  setTimeout(()=> dispatch(setResponse("",true)), 5500)
};

export const addCloneSeviceProcess =(newdata)=> async(dispatch)=>{

 
  dispatch(showLoader())
  try {
   
    newdata.serviceTypeId =newdata.processType
    newdata.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))
    newdata.activities = newdata.activities.map(x =>({activityId:x?.activityId,sequence:x.sequence}))
    newdata.status = newdata.status === "1" ? true : false;
  

    const request = await CustomAxios.post(`Services`,newdata)

    if(request){
      dispatch(toggleModal())
      dispatch(setResponse("Process added successfully",true))
      dispatch(getAllSeviceProcess())
      dispatch(hideLoader())

      dispatch(setResponse("",true))
    }
  

    // dispatch({
    //   type: ADD_NEW_SERVICEACTIVITY,
    //   payload: data,
    // });
  } catch (error) {
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  dispatch(setResponse("",true))

}

export const addNewSeviceProcess = (newdata) => async (dispatch) => {
  dispatch(showLoader())
  try {
   
    newdata.serviceTypeId =newdata.processType
    newdata.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))
    newdata.activities = newdata.activities.map(x =>({activityId:x?.activityId,sequence:x.sequence}))
    newdata.status = newdata.status === "1" ? true : false;
  

    const request = await CustomAxios.post(`Services`,newdata)

    if(request){
      dispatch(toggleModal())
      dispatch(setResponse("Process added successfully",true))
      dispatch(getAllSeviceProcess())
      dispatch(hideLoader())

      dispatch(setResponse("",true))
    }
  

    // dispatch({
    //   type: ADD_NEW_SERVICEACTIVITY,
    //   payload: data,
    // });
  } catch (error) {
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  dispatch(setResponse("",true))
};


export const getAllProcessOwner = () => async (dispatch) => {
  try {
   
    const request = await CustomAxios.get(`Services/ProcessOwners`)

  let res = request.data.map(x => ({id:x.id, name:`${x.firstName} ${x.lastName}`}))

    dispatch({
      type: GET_ALL_PROCESSOWNER,
      payload: res,
    });
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  }
};


export const getAllProcessType = () => async (dispatch) => {
  try {
   
    const request = await CustomAxios.get(`Services/ServiceTypes?results=1000`)



    dispatch({
      type: GET_ALL_PROCESS_TYPES,
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

    const result = await CustomAxios.get(`Services?filter=${textValue}`)

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    })
  
      console.log({result})
  
  },200)

  Search()

}
const renderData =({id,code,name,description,serviceType,status,activities,proccessOwners})=>{
  return {
    id,
    code,
    name,
    description,
    status: status ? "1" :"0",
    processType:serviceType.id,
    activities,
    processOwner:proccessOwners.map(x => ({id:x.id, name:`${x.firstName} ${x.firstName}`}))

  }
}

export const getProcess =(data)=> async(dispatch)=>{
 

  try {
    const result = await CustomAxios.get(`Services/${data.id}`)

     

    // newdata.serviceTypeId =newdata.processType
    // newdata.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))
    // newdata.activities = newdata.activities.map(x =>({activityId:x.activityId,sequence:x.sequence}))
    // newdata.status = newdata.status === "1" ? true : false;

    //return

    let processObj = renderData(result.data)


    if(processObj){
      dispatch({
        type: SET_PROCESS,
        payload:processObj
      })
    }

   

  } catch (error) {
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
 
}

export const getSelectedProcess  =(data)=> async(dispatch)=>{


  


  dispatch({
    type: SET_PROCESS,
    payload:data
  })
}

export const updateProcess = (newdata) => async (dispatch) => {
  dispatch(showLoader())

 
 

 let newObj = {}

  newObj.code = newdata.code
  newObj.name = newdata.name
  newObj.description = newdata.description
  newObj.serviceTypeId = newdata.processType
  newObj.serviceId = newdata.id
  newObj.status = newdata.status === "1" ? true : false;
  newObj.activities = newdata.activities.map(x =>({activityId:x?.id || x?.activityId,sequence:x.sequence})).sort((a,b) => a.sequence - b.sequence)
  newObj.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))

 
  try {

    const docs = await CustomAxios.put(`Services`, newObj);
    // console.log({docs})

    if(docs){
      dispatch(toggleModal())
      dispatch(setResponse("Process updated successfully",true))
      dispatch(getAllSeviceProcess())
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

export const deleteProcess = (newdata) => async (dispatch) => {
  dispatch(showLoader())
  try {

    const docs = await CustomAxios.delete(`Services`, {data : {serviceId:newdata.id}}, { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    }});
   
    if(docs){
     
      dispatch(setResponse("Process deleted successfully",true))
      dispatch(getAllSeviceProcess())
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

}
// const Search = debounce(async () => {
    
//   fetch(`https://demo.dataverse.org/api/search?q=${text}`)
//     .then((res) => res.json())
//     .then((json) => console.log({data:json.data.items}));
// }, 500);

 