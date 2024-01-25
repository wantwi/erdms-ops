import PageTitle from "components/common/PageTitle";
import React, { useState } from "react";

import JobForm from "./forms/JobForm";
import JobTable from "./table/JobTable";
import { useDispatch } from "react-redux";

import {
  getSelectedJob,
  resetJob,
} from "redux/job/action";

import { showLoader, hideLoader } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import useDebounce from "hooks/useDebounce";
import { useGet, useGetById } from "hooks/useQueryInfo";

const JobPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [jobRegulatoryOpt, setJobRegulatoryOpt] = useState([]);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);
  const [selectedRowId, setSelectedRowId] = useState("")

  // const { job } = useSelector((state) => state.jobState);

  //const request = useFetch()

  const btnClickHandler = () => {
    dispatch(resetJob());
    setOpenModal(true);
  };

  const GetById = async () => {
    dispatch(showLoader());
    const response =  await customApi.get(`Job/${selectedRowId}`)

    return response.data

  }

  const onGetByIdSuccess = (data) => {
    dispatch(getSelectedJob(data));
  
    dispatch(hideLoader());
     setOpenModal(true);
    
  }

  const onGetByIdError = (data) => {
    console.log({data})
  }
  const { data:selectedJob, refetch } = useGetById(
    "jobs",
    selectedRowId,
    GetById,
    onGetByIdSuccess,
    onGetByIdError
  );

  const getJobRegulatoryOptions = async (id) => {
    const response = await customApi.get(`Job/JobReglatoryOptions/${id}`);
    if (response) {
      setJobRegulatoryOpt(response.data);

      // setTimeout(() => {
      //   setOpenModal(true);
      //   dispatch(hideLoader());
      // }, 100);
    }
    console.log({ getAllRegulatoryOptions: response });
  };
  const rowSelected = ({data}) => {
    getJobRegulatoryOptions(data.id);

    dispatch(showLoader());

    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);


  };

  const GetAllProcessOwner = async () => {
    let url = `Services/ProcessOwners?results=1000`;
    const response = await customApi.get(url);
    return response.data.map((x) => ({
      id: x.id,
      name: `${x.firstName} ${x.lastName}`,
    }));
  };
  const GetAllFinanceOption = async () => {
    let url = `Job/FinancingOptions`;
    const response = await customApi.get(url);
    return response.data;
  };

  const GetAllBranch = async () => {
    let url = `Job/Branches`;
    const response = await customApi.get(url);
    return response.data;
  };

  const GetAllSeviceProcess = async () => {
    let url = `Services?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllRegulatoryOptions = async () => {
    let url = `RegulatoryOptions?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllJobs = async () => {
    let url = `Job?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const onSuccess = () => {};
  const onError = (data) => {
    console.error({ onError: data });
  };

  const { data: processowners } = useGet(
    "process-owners",
    GetAllProcessOwner,
    "",
    onSuccess,
    onError
  );

  const { data: financeOption } = useGet(
    "finance-option",
    GetAllFinanceOption,
    "",
    onSuccess,
    onError
  );
  const { data: serviceProcess } = useGet(
    "service-process",
    GetAllSeviceProcess,
    "",
    onSuccess,
    onError
  );
  const { data: branch } = useGet(
    "branch",
    GetAllBranch,
    "",
    onSuccess,
    onError
  );

  const { data: regulatoryOptions } = useGet(
    "regulatoryOptions",
    GetAllRegulatoryOptions,
    "",
    onSuccess,
    onError
  );

  const {isLoading,  data } = useGet(
    "jobs",
    GetAllJobs,
    debouncedSearch,
    onSuccess,
    onError
  );

  
  return (
    <>
      <div>
        <PageTitle
          title="Operation"
          className="plr-15"
          breadCrumb={[
            {
              name: "Job",
            },
            {
              name: "New Job",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}> Job</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label for="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search this table
                          </span>
                          <input
                            id="search-bar-0"
                            type="text"
                            aria-labelledby="search-bar-0-label"
                            class="form-control "
                            placeholder="Search"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: 400 }}
                          />
                        </label>
                        <i class="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8 ">
                    <div class="text-sm-end" style={{ float: "right" }}>
                      <button
                        type="button"
                        class="btn-rounded mb-2 me-2 btn btn-primary"
                        onClick={btnClickHandler}
                      >
                        <i class="mdi mdi-plus me-1"></i> Add New Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {
                isLoading? "loading..." : <JobTable data={data} rowSelected={rowSelected} />
              }

              
            </div>
          </div>
          <JobForm
            jobRegulatoryOpt={jobRegulatoryOpt}
            setJobRegulatoryOpt={setJobRegulatoryOpt}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Create Job"}
            processowners={processowners} 
            serviceprocess={serviceProcess}
            financeOptions={financeOption}
            branches={branch}
            regulatoryOptions={regulatoryOptions}
          />
        </div>
      </div>
    </>
  );
};

export default JobPage;
