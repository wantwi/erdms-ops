import PageTitle from "components/common/PageTitle";
import ApplicationTypeTable from "components/tables/syncfussionTable/applicationTypeTable/ApplicationTypeTable";
// import CardHeader from "../../../components/cardHeader/CardHeader";
import React, { useState, useEffect } from "react";
// import CustomModal from "../../../components/modal/CustomModal";
import ServiceTypeForm from "./forms/ServiceTypeForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedProcess,
} from "redux/serviceProcess/actions";
import { setAllSeviceActivity } from "redux/serviceActivity/actions";
import { useGet } from "hooks/useQueryInfo";
import useCustomApi from "api/useCustomApi";
import useDebounce from "hooks/useDebounce";

const ServiceType = (props) => {
  const dispatch = useDispatch();
  const [isClone, setIsClone] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [text, SetText] = useState("");
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);

  const btnClickHandler = () => {
    dispatch(
      getSelectedProcess({
        code: "",
        name: "",
        description: "",
        processType: "",
        status: "",
        processOwner: [],
        activities: [],
      })
    );
    setActivities([]);
    setOpenModal(true);
  };
  const { process } = useSelector((state) => state.ServiceProcess);
  const onSuccess = (data) => {};
  const onError = (data) => {
    console.error({ onError: data });
  };


  const GetAllSeviceProcess = async () => {
    let url = `Services?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllProcessTypes = async () => {
    let url = `Services/ServiceTypes?results=1000`;
    const response = await customApi.get(url);
    return response.data;
  };

  const GetAllProcessOwner = async () => {
    let url = `Services/ProcessOwners?results=1000`;
    const response = await customApi.get(url);
    return response.data.map((x) => ({
      id: x.id,
      name: `${x.firstName} ${x.lastName}`,
    }));
  };

  

  const GetAllServiceActivities = async () => {
    let url = `Activities?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const onServiceSuccess = (data) => {
    console.log({onServiceSuccess: data})
    dispatch(setAllSeviceActivity(data))
  }

  const { data: serviceActivityies } = useGet(
    "sevice-activities",
    GetAllServiceActivities,
    "",
    onServiceSuccess,
    onError
  );
  


  
  const { isLoading, data } = useGet(
    "service-process",
    GetAllSeviceProcess,
    debouncedSearch,
    onSuccess,
    onError
  );

  const { data: processtypes } = useGet(
    "process-types",
    GetAllProcessTypes,
    "",
    onSuccess,
    onError
  );
  const { data: processowners } = useGet(
    "process-owners",
    GetAllProcessOwner,
    "",
    onSuccess,
    onError
  );

  useEffect(() => {
    // dispatch(getAllSeviceProcess())
    //  dispatch(getAllSeviceActivity())
    // dispatch(getAllProcessType())
    // dispatch(getAllProcessOwner())
  }, []);
  console.log({serviceActivityies,isLoading,onError})
  return (
    <>
      <div>
        <PageTitle
          title="Setup"
          className="plr-15"
          breadCrumb={[
            {
              name: "Service Items",
            },
            {
              name: "Service Process",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Service Process</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label for="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search process
                          </span>
                          <input
                            id="search-bar-0"
                            type="text"
                            aria-labelledby="search-bar-0-label"
                            class="form-control "
                            placeholder="Search"
                            value={text}
                            onChange={(e) => SetText(e.target.value)}
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
                        <i class="mdi mdi-plus me-1"></i> Add New Process
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <ApplicationTypeTable
                data={data}
                setIsClone={setIsClone}
                setOpenModal={setOpenModal}
              />
            </div>
          </div>

          <ServiceTypeForm
            activities={activities}
            setActivities={setActivities}
            isClone={isClone}
            setIsClone={setIsClone}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={
              process.id && isClone === false
                ? `Service Process: ${process.name}`
                : "Create Process"
            }
            processtypes={processtypes}
            processowners ={processowners}
          />
        
        </div>
      </div>
    </>
  );
};

export default ServiceType;
