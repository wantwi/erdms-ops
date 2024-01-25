import PageTitle from "components/common/PageTitle";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AssignActivityTable from "./table/AssignActivityTable";

import JobActivityTable from "./table/JobActivityTable";
import JobModal from "./modal/JobModal";
import { hideLoader, setResponse } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import useDebounce from "hooks/useDebounce";
import { useGet, useGetById } from "hooks/useQueryInfo";
import { usePost, usePut } from "hooks/useMutateInfo";
const renderActivities = (data) => {
  console.log({ data });

  return data.map((x) => ({
    ...x,
    name: `${x?.officer?.firstName || ""} ${x.officer?.lastName || ""}`,
  }));
};

const AssignActivity = (props) => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [jobInfo, setJobInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [info, setInfo] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const [activityId, setActivityId] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);
  let grid = useRef();

  const PutData = async (data) => {
   

    data.jobActivityId = activityId.id;

    const updateJob = await customApi.put(`Job/JobActivity/Reassign`, {
      ...data,
      newOfficerId: data.officerId,
    });
  };

  const PostData = async (data) => {
   
    data.jobActivityId = activityId;

    const updateJob = await customApi.post(`Job/JobActivity/Assign`, data);
  };

  const GetAllProcessOwner = async () => {
    let url = `Services/ProcessOwners?results=1000`;
    const response = await customApi.get(url);
    return response.data.map((x) => ({
      id: x.id,
      name: `${x.firstName} ${x.lastName}`,
    }));
  };

  const GetAllJobs = async () => {
    let url = `Job?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetById = async () => {
   
    const response = await customApi.get(`Job/JobActivities/${id}`);

    return response.data;
  };

  const onGetByIdSuccess = (data) => {
    setActivities(renderActivities(data));

    dispatch(hideLoader());
    setOpenModal(true);
  };

  const onGetByIdError = (data) => {
    console.log({ data });
  };
  const { data: selectedJob, refetch } = useGetById(
    "jobs",
    id,
    GetById,
    onGetByIdSuccess,
    onGetByIdError
  );

  const { data: processowners } = useGet(
    "process-owners",
    GetAllProcessOwner,
    "",
    () => {},
    () => {}
  );

  const { data } = useGet(
    "jobs",
    GetAllJobs,
    debouncedSearch,
    () => {},
    () => {}
  );

  const rowSelected = (args) => {
    console.log({ args });
    setJobInfo(args.data);

    setId(args.data.id);

    setTimeout(() => {
      refetch();
    }, 100);
  };
  const onSuccess = () => {
   
    dispatch(setResponse(`Successful`, true));
    refetch();
    dispatch(setResponse(``, true));
  };


  const onError = (err) => {
    
    let msg = err.response.data.errors[0]?.message || "something went wrong";
   
    dispatch(setResponse(msg, false));
   
    dispatch(setResponse("", true));
  };

  const { mutate: postData } = usePost(PostData, onSuccess, onError);
  const { mutate: putData } = usePut(PutData, onSuccess, onError);

  const handleSubmit = (values) => {
   
    if (activityId?.officer?.id) {
      values.jobActivityId = activityId.id;

      putData(values);
    } else {
      values.jobActivityId = activityId;
      postData(values);
    }
  };

  const showOfficerModal = (name, id) => {
    setInfo({ name, id });
    setShowForm(true);
  };

  return (
    <>
      <div>
        <PageTitle
          title="TRANSACTION"
          className="plr-15"
          breadCrumb={[
            {
              name: "Manage Job",
            },
            {
              name: "Assign Activity",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Assign Activity</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label htmlFor="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search this table
                          </span>
                          <input
                            id="search-bar-0"
                            type="text"
                            aria-labelledby="search-bar-0-label"
                            className="form-control "
                            placeholder="Search"
                            value={text}
                            onChange={(e) => SetText(e.target.value)}
                            style={{ width: 400 }}
                          />
                        </label>
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <AssignActivityTable
                rowSelected={rowSelected}
                setJobInfo={setJobInfo}
                setOpenModal={setOpenModal}
                data={data}
              />
            </div>
          </div>

          <JobModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="show Modal"
            jobInfo={jobInfo}
          >
            <JobActivityTable
              activities={activities}
              setActivities={setActivities}
              showOfficerModal={showOfficerModal}
              showForm={showForm}
              setShowForm={setShowForm}
              handleSubmit={handleSubmit}
              setActivityId={setActivityId}
              isLoading={isLoading}
              setisLoading={setisLoading}
              grid={grid}
            />
          </JobModal>
        </div>
      </div>
    </>
  );
};

export default AssignActivity;
