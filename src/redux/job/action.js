import axios from "axios";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";

export const jobActionType = {
  GET_BRANCH: "GET_BRANCH",
  GET_FINANCEOPTION: "GET_FINANCEOPTION",
  GET_ALL_JOBS: "GET_ALL_JOBS",
  GET_JOB_ACTIVITIES: "GET_JOB_ACTIVITIES",
  ISLOADING: "ISLOADING",
  SET_JOB: "SET_JOB",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  JOB_REGULATORY_OPTION:"JOB_REGULATORY_OPTION"
};

const {
  GET_BRANCH,
  GET_FINANCEOPTION,
  GET_ALL_JOBS,
  GET_JOB_ACTIVITIES,
  ISLOADING,
  SET_JOB,
  SET_SEARCH_RESULT,
  JOB_REGULATORY_OPTION
} = jobActionType;

export const setIsLoadingStatus = () => (dispatch) => {
  dispatch({
    type: ISLOADING,
  });
};

export const getAllBranch = () => async (dispatch) => {
  try {
    const branch = await CustomAxios.get(`Job/Branches`);

    if (branch) {
      dispatch({
        type: GET_BRANCH,
        payload: branch.data,
      });
    }
  } catch (error) {}
};

export const getAllFinanceOption = () => async (dispatch) => {
  try {
    const branch = await CustomAxios.get(`Job/FinancingOptions`);

    if (branch) {
      dispatch({
        type: GET_FINANCEOPTION,
        payload: branch.data,
      });
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
  }
};

export const getAllJobs = () => async (dispatch) => {
  dispatch(showLoader());

  try {
    const job = await CustomAxios.get(`Job?results=1000`);

    if (job) {
      dispatch({
        type: GET_ALL_JOBS,
        payload: job.data.items,
      });
      dispatch(hideLoader());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }

    if (error.response.data?.errors[0]?.message) {
      dispatch(setResponse(error.response.data.errors[0].message, false));
    } else {
    }

    dispatch(hideLoader());
  }
};

export const createJob = (data) => async (dispatch) => {
  dispatch(showLoader());


  

  try {
    let jobData = {
      customerId: data.customer.id,
      services: data.selectedServices.map((x,i) =>({serviceId: x.id, sequence:i+1})),
      branchId: data.branchId,
      financingOptionId: data.financeId,
      requestedAt: data.requestDate,
      isTaxExemption: data.customer.taxExempt,
      remarks: data.remarks,
      jobOwnerIds: data.processOwner.map((x) => x.id),
    };

   
    const job = await CustomAxios.post(`Job`, jobData);

    if (job) {
      dispatch(setResponse("Job added successfully", true));
      //dispatch(getAllCustomers());
      dispatch(hideLoader());
      dispatch(setResponse("", true));

      dispatch(getAllJobs());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
    dispatch(setResponse(error.response.data.errors[0].message, false));
    dispatch(hideLoader());
    dispatch(setResponse("", true));
  }
};

export const updateJob = (data,jobId) => async (dispatch) => {
  dispatch(setIsLoadingStatus());

  dispatch(showLoader());

  
const renderData = data.map((x,i)=>({
  serviceId:x?.serviceId||x?.id,
  sequence: x?.serviceSequence ===null || x?.serviceSequence ===undefined ? 1+i : i+1,
  activities: x?.activities.map(y =>({...y}))}))

renderData.forEach(item => {
  if(item.activities.length === 0){
    delete item.activities
  }
  
});

try {
  const updateJob = await CustomAxios.put(`Job`,{jobId, remarks:"",services:renderData});
  if (updateJob) {
    dispatch(setResponse("Job updated successfully", true));
    dispatch(hideLoader());
    dispatch(setResponse("", true));

    dispatch(getAllJobs());
  }
} catch (error) {

  dispatch(setResponse(error.response.data.errors[0].message, false));
  dispatch(hideLoader());
  
}




}

export const getJobActivities = (id) => async (dispatch) => {
  dispatch(setIsLoadingStatus());

  dispatch(showLoader());

  try {
    const jobActivities = await CustomAxios.get(`Job/JobActivities/${id}`);

    if (jobActivities) {
      dispatch({
        type: GET_JOB_ACTIVITIES,
        payload: jobActivities.data,
      });

      setTimeout(() => dispatch(hideLoader()), 2600);
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
    dispatch(setResponse(error.response.data.errors[0].message, false));
    dispatch(hideLoader());
  }
};

export const resetJob = () => (dispatch) => {
  const initdata = {
    customer: {},
    branchId: "",
    jobServices: [],
    selectedServices:[],
    processOwner: [],
    requestDate: "",
    financeId: "",
    remarks: "",
  
  };

  dispatch({
    type: SET_JOB,
    payload: initdata,
  });
};

export const getSelectedJob = (data) => async (dispatch) => {
  const { jobOwners, jobName, customer, isTaxExemption, jobNumber } = data;

  console.log({ data });

  console.log({ jobOwners });

  let jobObj = {};

  jobObj.id = data.id;
  jobObj.processOwner = [...jobOwners];
  jobObj.customer = { ...customer, taxExempt: isTaxExemption };
  jobObj.taxExempt = isTaxExemption;
  jobObj.branchId = data.branch.id;
  jobObj.jobServices = data.jobServices;
  jobObj.requestDate = data.requestedAt
    .replace("T14:29:47.652", "")
    .replace("T00:00:00", "");
  jobObj.financeId = data.financingOption.id;
  jobObj.remarks = data.remarks;
  jobObj.arr = jobOwners.map((x) => ({
    id: x.id,
    name: `${x.firstName} ${x.firstName}`,
  }));
  jobObj.cusArry = [customer];
  jobObj.jobNumber = jobNumber;
  jobObj.ucrNumber = data.ucrNumber

  console.log({ jobObj });

  dispatch({
    type: SET_JOB,
    payload: jobObj,
  });

  setTimeout(() => {
    dispatch({
      type: SET_JOB,
      payload: jobObj,
    });
  }, 100);
};

export const handleSearch = (textValue) => async (dispatch) => {
  const Search = debounce(async () => {
    const result = await CustomAxios.get(`Job?filter=${textValue}`);

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items,
    });

    console.log({ result });
  }, 200);

  Search();
};

export const jobRegulatoryOptions = (data) => async (dispatch) => {

    dispatch({
      type: JOB_REGULATORY_OPTION,
      payload: data,
    })
};


//