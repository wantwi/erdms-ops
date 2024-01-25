import axios from "axios"
import { jobActionType } from "./action"

const  {GET_BRANCH,GET_FINANCEOPTION,GET_ALL_JOBS,GET_JOB_ACTIVITIES, ISLOADING,SET_JOB, SET_SEARCH_RESULT, JOB_REGULATORY_OPTION}= jobActionType

const initialState ={
    branches :[],
    financeOptions :[],
    jobs :[],
    jobactivities:[],
    jobRegulatoryOption:[],
    isLoading:false,
    job:{ 
    customer: {},
    branchId: "",
    jobServices: [],
    processOwner: [],
    selectedServices:[],
    requestDate: "",
    financeId: "",
    remarks: ""}
    

}


const JobReducer = function(state = initialState, action) {
    switch (action.type) {

      case ISLOADING: {
        return {
          ...state,
          isLoading: true,
        };
      }

        case GET_ALL_JOBS: {
            return {
              ...state,
              jobs: [...action.payload],
            };
          }
          case GET_JOB_ACTIVITIES: {
            return {
              ...state,
              jobactivities: [...action.payload],
              isLoading:false
            };
          }

        case GET_BRANCH: {
            return {
              ...state,
              branches: [...action.payload],
            };
          }

          case SET_JOB: {
            return {
              ...state,
              job: action.payload,
            };
          }
        
        case GET_FINANCEOPTION: {
            return {
              ...state,
              financeOptions: [...action.payload],
            };
          }
        case JOB_REGULATORY_OPTION:{
          return {
            ...state,
            jobRegulatoryOption: action.payload,
          };
        }
          case SET_SEARCH_RESULT:

            {
              return {
                ...state,
                jobs: [...action.payload],
              };
            }
      
      
          default: {
            return {
              ...state,
            };
          }

    
    }
}

export default JobReducer;