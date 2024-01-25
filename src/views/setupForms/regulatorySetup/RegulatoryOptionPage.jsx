import PageTitle from "components/common/PageTitle";
import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
//  import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { useDispatch } from "react-redux";
import EquipmentTypeTable from "./table/EquipmentTable";
import EquipmentForm from "./form/EquipmentForm";
// import { getAllRegulatoryOptions, addNewRegulatoryOptions, getSelectedRegulatoryOptions, updateRegulatoryOptions,handleSearch } from "redux/regulatoryOption/action";
import {  getSelectedRegulatoryOptions} from "redux/regulatoryOption/action";
import useDebounce from "hooks/useDebounce";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";


const initOption = {
  code: "",
  name: "",
  description: "",
  status: true,
 
};



const EquipmentTypePage = (props) => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  // const [equipment, setEquipment] = useState(initOption);
  // const [equipments, setEquipments] = useState([]);
  const grid = useRef(null);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);

  const [openModal, setOpenModal] = useState(false);

  const GetAllRegulatoryOptions = async () => {
    let url = `RegulatoryOptions?results=1000`;
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

  const { isLoading, data } = useGet(
    "regulatoryOptions",
    GetAllRegulatoryOptions,
    debouncedSearch,
    onSuccess,
    onError
  );

  // const handleSubmit = (values) => {
  //   values.status = (values.status === "true" || values.status === true) ? true : false

  //   regulatoryOption?.id ? dispatch(updateRegulatoryOptions({...values, regulatoryOptionId:regulatoryOption.id})) : dispatch(addNewRegulatoryOptions(values))

  //   setOpenModal(false);
   
  // };

  const rowSelected = (args) => {
    let data = args.data;
    
   dispatch(getSelectedRegulatoryOptions({...data,regulatoryOptionId:data.id}))

    setOpenModal(true);

  };

  const btnClickHandler = () => {
    dispatch(getSelectedRegulatoryOptions(initOption))
     setOpenModal(true);
  };

  
 
console.log({isLoading})
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
              name: "Regulatory Option",
            },
          ]}
        />
        <div  className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Regulatory Option</span>
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
                        <i class="mdi mdi-plus me-1"></i> Add New Regulatory Option
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {
                isLoading?"Loading..." :  <EquipmentTypeTable
                rowSelected={rowSelected}
                grid={grid}
                regulatoryOptions={data}
                setOpenModal={setOpenModal}
              />
              }
             
            </div>
          </div>

          <EquipmentForm
            
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Add New Regulatory Option"}
          />
        </div>
      </div>
    </>
  );
};



export default EquipmentTypePage