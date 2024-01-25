import PageTitle from "components/common/PageTitle";
import {
  // getAllCustomers,
  getSelectedCustomer,
  // getIndustries,
  // getPosition,
  // handleSearch,
} from "redux/customer/actions";

import React, { useState, useEffect } from "react";
import CustomerRegistrationForm from "./forms/CustomerRegistrationForm";
import { useDispatch } from "react-redux";
import CustomerTable from "./table/CustomerTable";
import useCustomApi from "api/useCustomApi";
import useDebounce from "hooks/useDebounce";
import { useGet } from "hooks/useQueryInfo";

// import { InputGroup, InputGroupAddon, Input } from "reactstrap";
//import Button from "components/button/Button";

const CustomerRegistrationPage = (props) => {
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const [text, SetText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const customApi = useCustomApi();
  const debouncedSearch = useDebounce(text, 500);
  const btnClickHandler = () => {
    //setShowModal(true);

    dispatch(
      getSelectedCustomer({
        code: "",
        name: "",
        industryId: "",
        taxExempt: false,
        exemptionLetterPath: "",
        file: "",
        issuedAt: "",
        expiredAt: "",
        issuingAuthority: "",
        signedBy: "",
        phone1: "",
        phone2: "",
        email: "",
        address: "",
        digitalAddress: "",
        contactPerson: {
          firstName: "",
          lastName: "",
          positionId: "",
          phone1: "",
          phone2: "",
          email: "",
          address: "",
        },
      })
    );

    setOpenModal(true);
  };

  const GetAllCustomers = async () => {
    let url = `Customers?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };

  const GetAllPosition = async () => {
    let url = `Customers/Positions`;
    const response = await customApi.get(url);
    return response.data;
  };
  const GetAllIndustries = async () => {
    let url = `Customers/Industries`;
    const response = await customApi.get(url);
    return response.data;
  };

  const onSuccess = (data) => {};
  const onError = (data) => {
    console.error({ onError: data });
  };

  const { isLoading, data } = useGet(
    "customers",
    GetAllCustomers,
    debouncedSearch,
    onSuccess,
    onError
  );

  const { data: industries } = useGet(
    "industries",
    GetAllIndustries,
    "",
    onSuccess,
    onError
  );

  const { data: positions } = useGet(
    "positions",
    GetAllPosition,
    "",
    onSuccess,
    onError
  );

  // const handleDelete =()=>{
  //   //dispatch(deleteDocument(document))
  //   setOpenModal(false)
  //  }

  //  useEffect(() => {

  //   text.length > 0 ? dispatch(handleSearch(text)) : dispatch(getAllCustomers())

  // }, [text]);

  useEffect(() => {
    //dispatch(getAllCustomers())
    //dispatch(getIndustries())
    // dispatch(getPosition())
  }, []);
console.log({isLoading})
  return (
    <>
      <div>
        <PageTitle
          title="Setup"
          className="plr-15"
          breadCrumb={[
            {
              name: "Customer",
            },
            {
              name: "Registration",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Customer</span>
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
                        <i class="mdi mdi-plus me-1"></i>Add New Customer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <CustomerTable data={data} setOpenModal={setOpenModal} />
            </div>
          </div>
          <CustomerRegistrationForm
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Customer Registration"}
            industries={industries}
            positions={positions}
          />
          {/* <CardHeader
          title="Customer"
          btnText="Add New Customer"
          btnClickHandler={btnClickHandler}
          textValue={textValue}
          setTextValue={setTextValue}
        >
         
        </CardHeader> */}
          {/* <CustomModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={"Customer Registration"}
        >
        
        </CustomModal> */}
        </div>
      </div>
    </>
  );
};

export default CustomerRegistrationPage;
