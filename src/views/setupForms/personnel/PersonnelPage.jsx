import PageTitle from "components/common/PageTitle";
import React, { useState, useRef } from "react";

// import { debounce } from "lodash";
import "react-toastify/dist/ReactToastify.css";
import PersonnelTable from "./table/PersonnelTable";
import PersonnelForm from "./form/PersonnelForm";
// import { usePersonnelQuery } from "hooks/personnel/usePersonnelQuery";
import useCustomApi from "api/useCustomApi";
// import { useQueryClient } from "react-query";
import useDebounce from "hooks/useDebounce";
import { useGet } from "hooks/useQueryInfo";

const initPersonnel = {
  staffId: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfbirth: "",
  phone: "",
  email: "",
  status: true,
};

const PersonnelPage = (props) => {
  const customApi = useCustomApi()
  const [text, SetText] = useState("");
  const [personnel, setPersonnel] = useState(initPersonnel);
  // const [personnels, setPersonnels] = useState([]);
  const grid = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  // const queryClient = useQueryClient()
  const debouncedSearch = useDebounce(text, 500);

  const GetAllPersonnels = async () => {


    let url = `Personnels?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
 
      const response = await customApi.get(url)
      return response.data.items
  }

  const onSuccess = () => {
    // setPersonnels(data)
  }
  const onError = (data) => {
    console.error({onError: data})
  }

  const {isLoading, data} = useGet("personnels",GetAllPersonnels,debouncedSearch,onSuccess, onError)

  const rowSelected = (args) => {
    let data = args.data;
   
    if (data) {
     
      data.dateOfbirth = data.dateOfBirth.replace("T00:00:00", "");
    }

    setPersonnel(data);
    setOpenModal(true);
  };



  const btnClickHandler = () => {
    setOpenModal(true);
    setPersonnel(initPersonnel);
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
              name: "Persnonnel",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Personnel</span>
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
                        <i class="mdi mdi-plus me-1"></i> Add New Personnel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {
                isLoading ? "Loading..." : 
                <PersonnelTable
                rowSelected={rowSelected}
                grid={grid}
                personnels={data}
                setOpenModal={setOpenModal}
              />
              }
            </div>
          </div>

          <PersonnelForm
            personnel={personnel}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
    </>
  );
};

export default PersonnelPage;
