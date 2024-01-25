import { AssignActivityActionTypes } from "./action";

const { GET_ALL_JOBS, GET_JOB } = AssignActivityActionTypes;

const initialState = {
  jobs: [],
  job: {},
};

const AssginActivityReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_JOBS: {
      return {
        ...state,
        jobs: [...action.payload],
      };
    }
    case GET_JOB: {
      return {
        ...state,
        job: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default AssginActivityReducer;
