import PageTitle from "components/common/PageTitle";
import React, { useState, useEffect, useRef } from "react";


import "react-toastify/dist/ReactToastify.css";
// import CustomOverLay from "components/loader/CustomOverlay";
// import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { useDispatch } from "react-redux";
import EquipmentTable from "./table/EquipmentTable";
import EquipmentForm from "./form/EquipmentForm";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
import useDebounce from "hooks/useDebounce";


const initEquipment = {
  code: "",
  name: "",
  description: "",
  status: true,
  equipmentTypeId:""
};



const EquipmentPage = () => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [equipment, setEquipment] = useState(initEquipment);
  const [equipments, setEquipments] = useState([]);
  const grid = useRef(null);
  const debouncedSearch = useDebounce(text, 500);

  const [openModal, setOpenModal] = useState(false);
  const customApi = useCustomApi()
  // const { equipment,equipments} = useSelector(state => state.equipmentState)

  const GetAllEquipments = async () => {
    let url = `Equipments?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
 
      const response = await customApi.get(url)
      return response.data.items

    // const response = await customApi.get( `Equipments?results=1000`);
    // return response.data.items
  }

  const onGetSuccess = (data) => {
    setEquipments(data)
  }
  const  {isLoading, data} = useGet('equipments', GetAllEquipments,debouncedSearch,onGetSuccess)


  // const handleSubmit = (values) => {
  //   values.status = (values.status === "true" || values.status === true) ? true : false

  //   // equipment?.id ? dispatch(updateEquipment({...values, equipmentId:equipment.id})) : dispatch(addNewEquipment(values))

  //   setOpenModal(false);
   
  // };

  const rowSelected = (args) => {
    let data = args.data;
    setEquipment({...data,equipmentTypeId:data.equipmentType.id})
    // dispatch(getSelectedEquipment({...data,equipmentTypeId:data.equipmentType.id}))

    setOpenModal(true);

    console.log({ data });
    // if (data) {
    //   // data.dateOfbirth.replace('T00:00:00','')
    //   data.dateOfbirth = data.dateOfBith.replace("T00:00:00", "");
    // }

    // setEquipment(data);
    // setOpenModal(true);
  };

  const btnClickHandler = () => {
    // dispatch(getSelectedEquipment(initEquipment))
     setOpenModal(true);
  };

    useEffect(() => {

      // text.length > 0 ? dispatch(handleSearch(text)) : dispatch(getAllEquipments())

    }, [text]);

  useEffect(() => {
   // dispatch(getAllEquipments())
    //
   // getEquipment();
    return () => {};
  }, []);
console.log({equipments});
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
                        <i class="mdi mdi-plus me-1"></i> Add New Equipment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {
                isLoading ?"Loading..." : <EquipmentTable
                rowSelected={rowSelected}
                grid={grid}
                equipments={data}
                setOpenModal={setOpenModal}
              />
              }

              
            </div>
          </div>

          <EquipmentForm
            equipment={equipment}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Add New Equipment"}
          />
        </div>
      </div>
    </>
  );
};



export default EquipmentPage