import PageTitle from "components/common/PageTitle";
import React, { useState, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import EquipmentTypeTable from "./table/EquipmentTable";
import EquipmentForm from "./form/EquipmentForm";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
import useDebounce from "hooks/useDebounce";

const initEquipment = {
  code: "",
  name: "",
  description: "",
  status: true,
};

const EquipmentTypePage = () => {
  const customApi = useCustomApi();
  const [text, SetText] = useState("");
  const [equipment, setEquipment] = useState(initEquipment);
  // const [equipments, setEquipments] = useState([]);
  const grid = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const debouncedSearch = useDebounce(text, 500);

  const GetAllEquipments = async () => {
    let url = `Equipments/Type?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }

    const response = await customApi.get(url);
    return response.data.items;
  };

  const onGetSuccess = (data) => {
    // setEquipments(data);
  };
  const { isLoading, data } = useGet(
    "equipment-types",
    GetAllEquipments,
    debouncedSearch,
    onGetSuccess
  );

  const rowSelected = (args) => {
    let data = args.data;
    setEquipment({ ...data, equipmentTypeId: data.id });
    setOpenModal(true);
  };

  const btnClickHandler = () => {
    setEquipment(initEquipment);
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
              name: "Meta Data",
            },
            {
              name: "Equipment",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Equipment</span>
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
                        <i class="mdi mdi-plus me-1"></i> Add New Equipment Type
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <EquipmentTypeTable
                rowSelected={rowSelected}
                grid={grid}
                equipments={data}
                setOpenModal={setOpenModal}
              />
            </div>
          </div>

          <EquipmentForm
            equipment={equipment}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Add New Equipment Type"}
          />
        </div>
      </div>
    </>
  );
};

export default EquipmentTypePage;
