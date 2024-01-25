import PageTitle from "components/common/PageTitle";
import React, { useState, useEffect, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
// import CustomOverLay from "components/loader/CustomOverlay";
// import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { useDispatch } from "react-redux";
import EquipmentTypeTable from "./table/EquipmentTable";
import EquipmentForm from "./form/EquipmentForm";
// import {getAllRoles,handleSearch, addNewRoles, updateRole } from "redux/roles/action";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
import useDebounce from "hooks/useDebounce";

const initRole = {
  code: "",
  name: "",
  description: "",
  status: true,
};

// const { REACT_APP_SERVICE_URL } = process.env;

const RolesPage = (props) => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [role, setRole] = useState(initRole);
  const [roles, setRoles] = useState([]);
  const customApi = useCustomApi();
  const grid = useRef(null);
  const debouncedSearch = useDebounce(text, 500);

  const [openModal, setOpenModal] = useState(false);

  const GetAllRoles = async () => {
    let url = `Roles?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }

    const response = await customApi.get(url);
    return response.data.items;
  };

  // const GetAllRoles = async () => {
  //   const response = await customApi.get( `Roles?results=1000`);
  //   return response.data.items
  // }?filter=${textValue}

  const onGetSuccess = (data) => {
    console.log({ data });
    setRoles(data);
  };
  const { isLoading, data } = useGet(
    "roles",
    GetAllRoles,
    debouncedSearch,
    onGetSuccess
  );

  const handleSubmit = (values) => {
    console.log({ values });

    values.status =
      values.status === "true" || values.status === true ? true : false;

    // role?.id ? dispatch(updateRole({...values, roleId:role.id})) : dispatch(addNewRoles(values))

    setOpenModal(false);
  };

  const rowSelected = (args) => {
    let data = args.data;

    setRole({ ...data, status: data.status === 1 ? true : false });

    // dispatch(getSelectedRole({...data,roleId:data.id}))
    setOpenModal(true);
  };

  const btnClickHandler = () => {
    setRole(initRole);
    setOpenModal(true);
  };

  useEffect(() => {
    // text.length > 0 ? dispatch(handleSearch(text)) : dispatch(getAllRoles())
  }, [text]);

  console.log({ roles, handleSubmit });
  return (
    <>
      <div>
        <PageTitle
          title="Setup"
          className="plr-15"
          breadCrumb={[
            {
              name: "Meta Data",
            },
            {
              name: "Roles",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Roles</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label for="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search
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
                        <i class="mdi mdi-plus me-1"></i> Add New Role
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isLoading ? (
                "Loading..."
              ) : (
                <EquipmentTypeTable
                  rowSelected={rowSelected}
                  grid={grid}
                  equipments={data}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </div>

          <EquipmentForm
            role={role}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Add New Role"}
          />
        </div>
      </div>
    </>
  );
};

export default RolesPage;
