import { hideLoader} from "redux/loader/Loader";

export const AssignActivityActionTypes = {
  GET_ALL_JOBS: "GET_ALL_JOBS",
  GET_JOB: "GET_JOB",
};

export const { GET_ALL_JOBS, GET_JOB } = AssignActivityActionTypes;



const data = [];

// export const getAllJobs = () => (dispatch) => {
//   dispatch(hideLoader());

//   dispatch({
//     type: GET_ALL_JOBS,
//     payload: data,
//   });
// };

export const getJob = (id) => (dispatch) => {
  dispatch(hideLoader());

  const job = {
    jobInfo: {
      ...data.find((x) => x.code === id),
    },
    activities: [
      {
        sequence: 1,
        activity: { id: 1, name: "Pre Arriaval" },
        officer: {},
      },
      {
        sequence: 2,
        activity: { id: 2, name: "Long room" },
        officer: { id: 2, name: "Joyce Yamson" },
      },
    ],
  };
  dispatch({
    type: GET_JOB,
    payload: job,
  });
};
