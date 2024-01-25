import PageTitle from "components/common/PageTitle";
import ApplicationActivityTable from "./table/ApplicationActivityTable";

import React, {  useState } from "react";

// import CardHeader from 'components/cardHeader/CardHeader';
// import CustomModal from "../../../components/modal/CustomModal";
import ServiceActivityForm from "./form/ServiceActivityForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedActivity,
} from "../../../redux/serviceActivity/actions";
import useDebounce from "hooks/useDebounce";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
// import CustomOverLay from 'components/loader/CustomOverlay';

const ServiceActivity = (props) => {
 
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isClone, setIsClone] = useState(false);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);
  const GetAllSeviceActivities = async () => {
    let url = `Activities?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllDefaultRequirements = async () => {
    let url = `/Requirements/Default?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllProcessOwner = async () => {
    let url = `/Services/ProcessOwners`;
    const response = await customApi.get(url);
    return response.data.map((x) => ({
      id: x.id,
      name: `${x.firstName} ${x.lastName}`,
    }));
  };

  const GetAllActivityType = async () => {
    let url = `Activities/ActivityTypes?results=1000`;
    const response = await customApi.get(url);
    return response.data;
  };
  const onSuccess = () => {};
  const onError = (data) => {
    console.error({ onError: data });
  };

  const { isLoading, data } = useGet(
    "sevice-activities",
    GetAllSeviceActivities,
    debouncedSearch,
    onSuccess,
    onError
  );

  const { data: defaultrequirements } = useGet(
    "default-requirements",
    GetAllDefaultRequirements,
    "",
    onSuccess,
    onError
  );
  const { data: owners } = useGet(
    "process-owners",
    GetAllProcessOwner,
    "",
    onSuccess,
    onError
  );
  const { data: activitytypes } = useGet(
    "activity-types",
    GetAllActivityType,
    "",
    onSuccess,
    onError
  );

  const { serviceactivity } = useSelector((state) => state.seviceActitvity);

  const btnClickHandler = () => {
    dispatch(
      getSelectedActivity({
        code: "",
        name: "",
        days: "",
        emailList: "",
        activityType: "",
        requirements: [],
      })
    );
    setOpenModal(true);
  };



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
              name: "Service Activity",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Service Activity</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label  htmlFor="search-bar-0" className="search-label">
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
                  <div className="col-sm-8 ">
                    <div className="text-sm-end" style={{ float: "right" }}>
                      <button
                        type="button"
                        className="btn-rounded mb-2 me-2 btn btn-primary"
                        onClick={btnClickHandler}
                      >
                        <i className="mdi mdi-plus me-1"></i> Add New Activity
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isLoading ? (
                "Loading ..."
              ) : (
                <ApplicationActivityTable
                  data={data}
                  setIsClone={setIsClone}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </div>
          <ServiceActivityForm
          activitytypes={activitytypes}
          owners={owners}
          defaultrequirements={defaultrequirements}
            isClone={isClone}
            setIsClone={setIsClone}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={
              serviceactivity.id && isClone === false
                ? `Service Activity: ${serviceactivity.name}`
                : "Create Activity"
            }
          />

         
        </div>
      </div>
    </>
  );
};

export default ServiceActivity;
