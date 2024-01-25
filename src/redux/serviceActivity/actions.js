
import { hideLoader,showLoader, setResponse } from "redux/loader/Loader";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";

export const ServiceActitvityActionTypes = {
  GET_ALL_SERVICEACTIVITY: "GET_ALL_SERVICEACTIVITY",
  ADD_NEW_SERVICEACTIVITY: "ADD_NEW_SERVICEACTIVITY",
  SHOW_MODAL: "SHOW_MODAL",
  GET_ALL_PROCESSOWNER:"GET_ALL_PROCESSOWNER",
  GET_ALL_ACTIVITY_TYPES:"GET_ALL_ACTIVITY_TYPES",
  SET_SEARCH_RESULT:"SET_SEARCH_RESULT",
  SET_ACTYIVITY:"SET_ACTYIVITY"
};

const {
  GET_ALL_SERVICEACTIVITY,
 
  SHOW_MODAL,
  GET_ALL_PROCESSOWNER,
  GET_ALL_ACTIVITY_TYPES,
  SET_SEARCH_RESULT,
  SET_ACTYIVITY,
  
} = ServiceActitvityActionTypes;




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

export const getAllSeviceActivity = () => async (dispatch) => {
  dispatch(showLoader())
  try {
    const request = await CustomAxios.get(`Activities?results=1000`)

    console.log({resss:request})

    if(request){
      dispatch({
        type: GET_ALL_SERVICEACTIVITY,
        payload: request.data.items,
      });

     
    }
    
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  setTimeout(()=> dispatch(setResponse("",true)), 5500)
};

export const addNewSeviceActivity = (newdata) => async (dispatch) => {



   dispatch(showLoader())
  try {

    let newServie = {};
    newServie.code = newdata.code;
    newServie.name = newdata.name;
    newServie.tat = newdata.days;
    newServie.maillingList = newdata.emailList;
    newServie.activityTypeId = newdata.activityType
    newServie.requirementIds = newdata.requirements.map(x =>(x.id));


    //console.log({newServie});
    // dispatch(getAllSeviceActivity())
    // dispatch(setResponse("Activity added successfully",true))

    

    const request = await CustomAxios.post(`Activities`,newServie)
    
    if(request){
     
      dispatch(hideLoader())
      dispatch(getAllSeviceActivity())
      dispatch(setResponse("Activity added successfully",true))
     
    }
  
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(setResponse("",true))
  dispatch(hideLoader())
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


export const getAllActivityType = () => async (dispatch) => {
  try {
   
    const request = await CustomAxios.get(`Activities/ActivityTypes?results=1000`)
    dispatch({
      type: GET_ALL_ACTIVITY_TYPES,
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

    const result = await CustomAxios.get(`Activities?filter=${textValue}`)

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items
    })
  
      console.log({result})
  
  },200)

  Search()

}

const renderData =({id,code,name,tat,maillingList,activityType,requiements})=>{
  
  return {
    id,
    code,
    name,
    days:tat,
    emailList:maillingList,
    activityType:activityType.id,
    requirements:requiements
  }
}

export const getActiviy =(data)=> async(dispatch)=>{

  try {
    const result = await CustomAxios.get(`Activities/${data.id}`)

    

    dispatch({
      type: SET_ACTYIVITY,
      payload:renderData(result.data)
    })

  } catch (error) {
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
 
}


export const getSelectedActivity  =(data)=> async(dispatch)=>{
  dispatch({
    type: SET_ACTYIVITY,
    payload:data
  })
}

export const updateActivity= (newdata) => async (dispatch) => {
  dispatch(showLoader())
  let newServie = {};
  newServie.code = newdata.code;
  newServie.name = newdata.name;
  newServie.tat = newdata.days;
  newServie.maillingList = newdata.emailList;
  newServie.activityTypeId = newdata.activityType
  newServie.requirementIds = newdata.requirements.map(x =>(x.id));
  newServie.activityId= newdata.id

 


  try {

    const docs = await CustomAxios.put(`Activities`, newServie);
    console.log({docs})

    if(docs){
      dispatch(toggleModal())
      dispatch(setResponse("Activity updated successfully",true))
      dispatch(getAllSeviceActivity())
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

export const deleteActivity = (newdata) => async (dispatch) => {
  dispatch(showLoader())
 
  try {

    const docs = await CustomAxios.delete(`Activities`, {data : {activityId:newdata.id}}, { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    }});
   
    if(docs){
     
      dispatch(setResponse("Document deleted successfully",true))
      dispatch(getAllSeviceActivity())
      dispatch(hideLoader())
    }
  } catch (error) {
    
   dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader())
  dispatch(setResponse("",true))
};

export const setAllSeviceActivity = (data) => async (dispatch) => {
  console.log({setAllSeviceActivity: data})
  dispatch({
    type: GET_ALL_SERVICEACTIVITY,
    payload: data,
  });
    
 
};
