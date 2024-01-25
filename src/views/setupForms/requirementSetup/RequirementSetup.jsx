import PageTitle from "components/common/PageTitle";
import RequirementSetupTable from "components/tables/syncfussionTable/RequirementSetupTable/RequirementSetupTable";
import React, { useRef, useState } from "react";
import RequirementSetupForm from "./form/RequirementSetupForm";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedRequirement } from "../../../redux/requirementSetup/actions";
import "react-toastify/dist/ReactToastify.css";
import useDebounce from "hooks/useDebounce";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";

const RequirementSetup = (props) => {
  const submitBtn = useRef(null);
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);
  const GetAllRequirements = async () => {
    let url = `Requirements?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllDocuments = async () => {
    let url = `Documents?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };
  const GetAllRequirementActions = async () => {
    let url = `Requirements/RequirementActions?results=1000`;
    const response = await customApi.get(url);
    return response.data;
  };

  const GetAllRequirementTypes = async () => {
    let url = `Requirements/RequirementTypes?results=1000`;
    const response = await customApi.get(url);
    return response.data;
  };

  const AllRegulatoryOptions = async () => {
    let url = `RegulatoryOptions?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const onSuccess = (data) => {};
  const onError = (data) => {
    console.error({ onError: data });
  };

  const { requirement } = useSelector((state) => state.requirementSetup);

  const { data: documents } = useGet(
    "documents",
    GetAllDocuments,
    "",
    onSuccess,
    onError
  );
  const { data: regulatoryOptions } = useGet(
    "regulatoryOptions",
    AllRegulatoryOptions,
    "",
    onSuccess,
    onError
  );
  const { data: requirementActions } = useGet(
    "requirementActions",
    GetAllRequirementActions,
    "",
    onSuccess,
    onError
  );

  const { data: requirementTypes } = useGet(
    "requirement-types",
    GetAllRequirementTypes,
    "",
    onSuccess,
    onError
  );

  const { isLoading, data } = useGet(
    "requirements",
    GetAllRequirements,
    debouncedSearch,
    onSuccess,
    onError
  );

  const btnClickHandler = () => {
    dispatch(
      getSelectedRequirement({
        code: "",
        name: "",
        requirementTypeId: "",
        requirementAction: "",
        documentId: "",
        status: "",
        regulatoryOptionId: "",
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
              name: "Service Requirement",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Requirement Setup</span>
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
                        <i class="mdi mdi-plus me-1"></i>Add New Requirement
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isLoading ? (
                "Loading..."
              ) : (
                <RequirementSetupTable
                  data={data}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </div>

          <RequirementSetupForm
            regulatoryOptions={regulatoryOptions}
            requirementTypes={requirementTypes}
            requirementActions={requirementActions}
            documents={documents}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={
              requirement.id
                ? `Service Requirement: ${requirement.name}`
                : "New Requirment"
            }
          />
        </div>
      </div>
    </>
  );
};

export default RequirementSetup;
