import React, { useState, useRef, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCustomer,
  updateNewCustomer,
  deleteCustomer,
  createCustomerAccount
} from "redux/customer/actions";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";
import { hideLoader, setResponse, showLoader } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import { useQueryClient } from "react-query";

const CustomerRegistrationForm = ({
  openModal,
  title,
  setOpenModal,
  isChecked,
  setIsChecked,
  industries,
  positions
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const submitBtn = useRef(null);
  const inputFile = useRef(null);
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [warningAlert, setWarningAlert] = useState(false);
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

  const { customer } = useSelector(
    (state) => state.customerState
  );


  let schema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    name: Yup.string().required("Name is required"),
    industryId: Yup.string().required("Industry is required"),
    phone1: Yup.string().required("Phone number is required"),
    email: Yup.string().required("Email type is required"),
    taxExempt: Yup.boolean(),
    contactPerson: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      positionId: Yup.string().required("Position is required"),
      email: Yup.string().required("Email is required"),
      phone1: Yup.string().required("Mobile number is required"),
    }),
  });

  const PostData = async (newdata) => {
    dispatch(showLoader());
   
    if (newdata.taxExempt) {
      let fd = new FormData();
      fd.append("file", newdata.fileValue);

      //file upload

      const exemptTaxDoc = await customApi.post(
        `upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (exemptTaxDoc.data.fileId) {
        newdata.exemptionLetterPath = exemptTaxDoc.data.fileId;

        const customer = await customApi.post(
          `Customers`,
          newdata
        );

      }
    } else {
      let requestData = {
        name: newdata.name,
        industryId: newdata.industryId,
        taxExempt: false,
        exemptionLetterPath: " ",
        phone1: newdata.phone1,
        phone2: newdata.phone2,
        email: newdata.email,
        address: newdata.address,
        digitalAddress: newdata.digitalAddress,
        contactPerson: newdata.contactPerson,
      };

      const customer = await customApi.post(
        `Customers`,
        requestData
      );
    }
   
    //const response = await customApi.post("/Requirements", newRequirement);
  };
  const PutData = async (newdata) => {
    dispatch(showLoader());
    if (newdata.taxExempt) {
      let fd = new FormData();
      fd.append("file", newdata.fileValue);

      //file upload

      const exemptTaxDoc = await customApi.put(
        `upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (exemptTaxDoc.data.fileId) {
        newdata.exemptionLetterPath = exemptTaxDoc.data.fileId;

        const customer = await customApi.put(
          `Customers`,
          newdata
        );

      }
    } else {
      let requestData = {
        companyId: newdata.id,
        name: newdata.name,
        industryId: newdata.industryId,
        taxExempt: false,
        exemptionLetterPath: " ",
        phone1: newdata.phone1,
        phone2: newdata.phone2,
        email: newdata.email,
        address: newdata.address,
        digitalAddress: newdata.digitalAddress,
        contactPerson: newdata.contactPerson,
      };

      const customer = await customApi.put(
        `Customers`,
        requestData
      );
     
    }
  
  };
  const DeleteData = async (data) => {
    dispatch(showLoader());
    const response = await customApi.delete("/Customers", {
      data: { companyId: data.id },
    });
  };


  const CreateAccount = async (customerId) => {
    dispatch(showLoader());
    const request = await customApi.post(`Customers/SignUp`, {customerId})

   
  };
  
  const onPostSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("customers");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("customers");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("customers");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };

  const onAccountSuccess = () =>{
    
    dispatch(setResponse("Customer login credential sent.", true));
    dispatch(setResponse("", true));
  
    dispatch(hideLoader());

  }
  
  const onError = () => {
    dispatch(hideLoader());
  }
  
  const { mutate: postData } = usePost(PostData, onPostSuccess,onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess, onError);
  const { mutate: accountData } = usePost(CreateAccount, onAccountSuccess,onError);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleClick = () => {
    const { code, name, industryId, phone1, email, contactPerson } = value;

    if (
      code === "" &&
      name === "" &&
      (industryId === "" % phone1) === "" &&
      email === ""
    ) {
      setActiveTab("1");
    }

    if (
      code.length > 0 &&
      name.length > 0 &&
      industryId.length > 0 % phone1.length > 0 &&
      email.length > 0 &&
      (contactPerson?.name === "" ||
        contactPerson?.positionId === "" ||
        contactPerson?.email === "" ||
        contactPerson?.phone1 === "")
    ) {
      setActiveTab("2");
    } else {
      setActiveTab("1");
    }
  };

  const handleSubmit = (values) => {
    if (inputFile?.current?.files[0]) {
      values.fileValue = inputFile.current.files[0];
    }

    console.log({ values });
    
    customer?.id
      ? putData(values)
      : postData(values);
    // customer?.id
     //? dispatch(updateNewCustomer(values))
    //   : dispatch(addNewCustomer(values));

    //  if(process.id){

    //values.id = process.id;
    //console.log({values})
    //dispatch(updateProcess(values))

    //  }else{
    //dispatch(addNewSeviceProcess(values))
    // }

    setOpenModal(false);
  };

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    deleteData(customer)
    //dispatch(deleteCustomer(customer));
    setOpenModal(false);
  };

  const handleClickEvent = () => {
    //dispatch(addNewDocument())

    submitBtn.current.click();
  };

  // const handleChange2 = (e) => {
  //   console.log({ vals: e.target.value });
  // };

  const signupCustomer =()=>{
    accountData(customer.id)
    // dispatch(createCustomerAccount(customer.id))

  }

  useEffect(() => {
    if (customer.taxExempt) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [customer]);

  console.log({customer})

  return (
    <div>
      <SweetAlert
        warning
        showCancel
        show={warningAlert}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={onConfirm}
        onCancel={() => setWarningAlert(!warningAlert)}
      >
        You will not be able to recover this record!
      </SweetAlert>
      <Modal
        isOpen={openModal}
        size="lg"
        //className={className}
      >
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={customer}
            validationSchema={schema}
            onSubmit={handleSubmit}
            ref={formikRef}
          >
            {({ values, errors, handleChange, touched }) => (
              <Form encType="multipart/form-data">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "doc-title"
                      )}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Customer Details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "2" },
                        "doc-title"
                      )}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Primary Contact Details
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <div className="doc-title mt-10">
                          <Form>
                            <Row form>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for="processCode">
                                    Code <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="code"
                                    id="code"
                                    placeholder="Code"
                                    onChange={handleChange}
                                    value={values.code}
                                    className={
                                      errors.code && touched.code
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors.code && touched.code && (
                                    <div className="text-danger">
                                      {errors.code}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="processCode">
                                    Name <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    value={values.name}
                                    className={
                                      errors.name && touched.name
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors.name && touched.name && (
                                    <div className="text-danger">
                                      {errors.name}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for="processType">
                                    Industry{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="select"
                                    name="industryId"
                                    id="industryId"
                                    onChange={handleChange}
                                    value={values?.industryId}
                                    className={
                                      errors.industryId && touched.industryId
                                        ? "invalid"
                                        : ""
                                    }
                                  >
                                    <option value="">Select industry</option>
                                    {industries.map((x,i) => (
                                      <option key={i} value={x.id}>{x.name}</option>
                                    ))}
                                  </Input>
                                  {errors.industryId && touched.industryId && (
                                    <div className="text-danger">
                                      {errors.industryId}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="ml-2">
                              <Col md={12}>
                                <FormGroup>
                                  <Input
                                    type="checkbox"
                                    name="taxExempt"
                                    id="taxExempt"
                                    placeholder="taxExempt"
                                    onChange={(e) =>
                                      setIsChecked(e.target.checked)
                                    }
                                    // onChange={handleChange}
                                    value={(values.taxExempt = isChecked)}
                                  />
                                  <Label for="processCode">Tax Exempt</Label>
                                </FormGroup>
                              </Col>
                            </Row>
                            {isChecked ? (
                              <>
                                <Row form>
                                  <Col md={4}>
                                    <FormGroup>
                                      <Label for="file">Exemption letter</Label>
                                      <input
                                        type="file"
                                        value={values.file}
                                        id="file"
                                        name="file"
                                        ref={inputFile}
                                        onChange={handleChange}
                                      />
                                      {/* <Input
                            ref={inputFile}
                              type="file"
                              name="file"
                              id="file"
                              placeholder="Upload document"
                              onChange={handleChange2}
                              value={values.file}
                              acept
                            /> */}
                                    </FormGroup>
                                  </Col>
                                  <Col md={4}>
                                    <FormGroup>
                                      <Label for="issuedAt">Issue Date</Label>
                                      <Input
                                        type="date"
                                        name="issuedAt"
                                        id="issuedAt"
                                        placeholder="Issue Date"
                                        onChange={handleChange}
                                        value={values.issuedAt}
                                      />
                                      {errors.issuedAt && touched.issuedAt && (
                                        <div className="text-danger">
                                          {errors.issuedAt}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col md={4}>
                                    <FormGroup>
                                      <Label for="expiredAt">
                                        Expiration Date
                                      </Label>
                                      <Input
                                        type="date"
                                        name="expiredAt"
                                        id="expiredAt"
                                        placeholder="Expiration Date"
                                        onChange={handleChange}
                                        value={values.expiredAt}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <Row form>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="processCode">
                                        Issuing Authority/MDA
                                      </Label>
                                      <Input
                                        type="text"
                                        name="issuingAuthority"
                                        id="issuingAuthority"
                                        placeholder="Issuing Authority/MDA"
                                        onChange={handleChange}
                                        value={values.issuingAuthority}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Label for="processCode">Signed by</Label>
                                      <Input
                                        type="text"
                                        name="signedBy"
                                        id="signedBy"
                                        placeholder="Signed by"
                                        onChange={handleChange}
                                        value={values.signedBy}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </>
                            ) : null}

                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="processCode">
                                    Phone Number{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="phone1"
                                    id="phone1"
                                    placeholder="Phone number"
                                    onChange={handleChange}
                                    value={values.phone1}
                                    className={
                                      errors.phone1 && touched.phone1
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors.phone1 && touched.phone1 && (
                                    <div className="text-danger">
                                      {errors.phone1}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="processCode">Phone (Other)</Label>
                                  <Input
                                    type="text"
                                    name="phone2"
                                    id="phone2"
                                    placeholder="Phone (Other)"
                                    onChange={handleChange}
                                    value={values.phone2}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="">
                                    Email <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="email"
                                    id=""
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.email}
                                    className={
                                      errors.email && touched.email
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors.email && touched.email && (
                                    <div className="text-danger">
                                      {errors.email}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="address">Address</Label>
                                  <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    onChange={handleChange}
                                    value={values.address}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="digitalAddress">
                                    Digital Address
                                  </Label>
                                  <Input
                                    type="text"
                                    name="digitalAddress"
                                    id="digitalAddress"
                                    placeholder="Digital Address"
                                    onChange={handleChange}
                                    value={values.digitalAddress}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <div className="doc-title mt-10">
                          <Form>
                            <Row form>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for="processCode">
                                    First Name{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="contactPerson.firstName"
                                    id="firstName"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    value={values.contactPerson.firstName}
                                    className={
                                      errors?.contactPerson?.firstName &&
                                      touched?.contactPerson?.firstName
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors?.contactPerson?.firstName &&
                                    touched?.contactPerson?.firstName && (
                                      <div className="text-danger">
                                        {errors?.contactPerson?.firstName}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for="processCode">
                                    Last Name{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="contactPerson.lastName"
                                    id="lastName"
                                    placeholder="Last name"
                                    onChange={handleChange}
                                    value={values.contactPerson.lastName}
                                    className={
                                      errors?.contactPerson?.lastName &&
                                      touched?.contactPerson?.lastName
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors?.contactPerson?.lastName &&
                                    touched?.contactPerson?.lastName && (
                                      <div className="text-danger">
                                        {errors?.contactPerson?.lastName}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for="processType">
                                    Position{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="select"
                                    name="contactPerson.positionId"
                                    id="contactPerson.positionId"
                                    onChange={handleChange}
                                    value={values?.contactPerson?.positionId ||""}
                                    className={
                                      errors?.contactPerson?.positionId &&
                                      touched?.contactPerson?.positionId
                                        ? "invalid"
                                        : ""
                                    }
                                  >
                                    {/* <option   value="">Select Position<span className="isRequire">*</span></option> */}
                                    {positions.map((x) => <option value={x.id}>{x.name}</option>)}
                                  </Input>
                                  {errors?.contactPerson?.positionId &&
                                    touched?.contactPerson?.positionId && (
                                      <div className="text-danger">
                                        {errors?.contactPerson?.positionId}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="contactEmail">
                                    Email <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="contactPerson.email"
                                    id="contactEmail"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.contactPerson.email}
                                    className={
                                      errors?.contactPerson?.email &&
                                      touched?.contactPerson?.email
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors?.contactPerson?.email &&
                                    touched?.contactPerson?.email && (
                                      <div className="text-danger">
                                        {errors?.contactPerson?.email}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="contactPhone1">
                                    Mobile Number{" "}
                                    <span className="isRequire">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="contactPerson.phone1"
                                    id="contactPhone1"
                                    placeholder="Mobile Number"
                                    onChange={handleChange}
                                    value={values.contactPerson.phone1}
                                    className={
                                      errors?.contactPerson?.phone1 &&
                                      touched?.contactPerson?.phone1
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors?.contactPerson?.phone1 &&
                                    touched?.contactPerson?.phone1 && (
                                      <div className="text-danger">
                                        {errors?.contactPerson?.phone1}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="contactPhone2">
                                    Phone (Other)
                                  </Label>
                                  <Input
                                    type="text"
                                    name="contactPerson.phone2"
                                    id="contactPhone1"
                                    placeholder="Phone (Other)"
                                    onChange={handleChange}
                                    value={values.contactPerson.phone2}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <button
                              type="submit"
                              hidden
                              ref={submitBtn}
                            ></button>
                            {setValue(values)}
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          {customer.id ? 

          customer?.isSignedUp ? null :
            <button
            style={{position:"absolute", left:"15px"}}
              className="btn btn-primary"
              onClick={signupCustomer}
              
            >Click to Signup</button> :null
          }
          <Button
            className="c-secondary"
            onClick={() => (setOpenModal(false), setIsChecked(false))}
          >
            {customer.id ? (
              <>
                <span>
                  <i className="fa fa-close"></i>{" "}
                </span>{" "}
                Close
              </>
            ) : (
              <>
                <span>
                  <i className="fa fa-close"></i>{" "}
                </span>{" "}
                Cancel
              </>
            )}
          </Button>
          {customer.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button
            className="c-primary"
            onClick={() => {
              handleClickEvent();
              handleClick();
            }}
          >
            {customer.id ? (
              <>
                <span>
                  <i className="fa fa-edit"></i>{" "}
                </span>{" "}
                Update
              </>
            ) : (
              <>
                <span>
                  <i className="fa fa-save"></i>{" "}
                </span>{" "}
                Save
              </>
            )}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomerRegistrationForm;
