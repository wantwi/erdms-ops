import React, { useRef, useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { usePersonnelPost, usePersonnelPut, usePersonnelDelete } from "hooks/personnel/usePersonnelMutation";
import useCustomApi from "api/useCustomApi";
import { useQueryClient } from "react-query";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader"
import { useDispatch } from "react-redux";

let schema = Yup.object().shape({
  staffId: Yup.string().required("Staff is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfbirth: Yup.date().required("Birth date is required"),
  phone: Yup.string().required("Status is required"),
  email: Yup.string().email('Invalid email format').required('Email Required'),
  status: Yup.boolean().required('Sataus Required'),
});



const PersonnelForm = ({ openModal, setOpenModal,personnel }) => {
  const [warningAlert, setWarningAlert] = useState(false);
  const customApi = useCustomApi()
 const submitBtn = useRef()
 const queryClient = useQueryClient()
 const dispatch = useDispatch()

 const PostData = async (data) => {

  const response = await customApi.post("/Personnels", data)

 }
 const PutData = async (data) => {
  
  const response = await customApi.put("/Personnels", data)
 }
 const DeleteData = async (data) => {
  const response = await customApi.delete("/Personnels",  data)
 }
 const onSuccess = (data) => {
  dispatch(setResponse(`Successful`, true));
  queryClient.invalidateQueries("personnels")
  setOpenModal(false)
  dispatch(setResponse(``, true));
 }

//  const onDeleteSuccess = (data) => {
//   dispatch(setResponse(`${data.firstName} is successfully romove`, true));
//   queryClient.invalidateQueries("personnels")
//   setOpenModal(false)
//  }

  const { mutate:postData} = usePersonnelPost(PostData, onSuccess)
  const { mutate:putData} = usePersonnelPut(PutData, onSuccess)
  const { mutate:deleteData} = usePersonnelDelete(DeleteData, onSuccess)
 
const handleSubmit =(data) => {
  console.log({data})

  if(data?.id){
    data.personnelId = data.id
    putData(data)
  }else{
    postData(data)
  }


}
  const handleClickEvent = () => {
     submitBtn.current.click();
  };

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
   deleteData({data : {personnelId:personnel.id}})
  };

  

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
      <Modal isOpen={openModal} size="lg">
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>{personnel?.id ? `Edit : ${personnel?.firstName} Info`: "Add New Personnel" } </span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              <div className="doc-title mt-10">
                <Formik
                  initialValues={personnel}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, handleChange, touched }) => (
                    <Form>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="staffId">
                              Staff ID <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="staffId"
                              id="staffId"
                              placeholder="Enter Staff Id "
                              onChange={handleChange}
                              value={values.staffId}
                              className={
                                errors.staffId && touched.staffId
                                  ? "invalid"
                                  : ""
                              }
                            />
                            {errors.staffId && touched.staffId && (
                              <div className="text-danger">{errors.staffId}</div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="firstName">
                              First Name <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="firstName"
                              id="firstName"
                              placeholder="Enter first name"
                              onChange={handleChange}
                              value={values.firstName}
                              className={
                                errors.firstName && touched.firstName ? "invalid" : ""
                              }
                            />
                            {errors.firstName && touched.firstName && (
                              <div className="text-danger">{errors.firstName}</div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="lastName">
                              Last Name <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="lastName"
                              id="lastName"
                              placeholder="Enter last name"
                              onChange={handleChange}
                              value={values.lastName}
                              className={
                                errors.lastName && touched.lastName
                                  ? "invalid"
                                  : ""
                              }
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="text-danger">
                                {errors.lastName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="processDescription">
                              Gender <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="select"
                              row={2}
                              name="gender"
                              id="gender"
                             
                              onChange={handleChange}
                              value={values.gender}
                              className={
                                errors.gender && touched.gender ? "invalid" : ""
                              }
                            >
                              <option value="">Select gender</option>
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                              <option>Others</option>
                            </Input>
                            {errors.gender && touched.gender && (
                              <div className="text-danger">{errors.gender}</div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="dateOfbirth">
                              Date of Birth <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="date"
                              name="dateOfbirth"
                              id="dateOfbirth"
                              onChange={handleChange}
                              value={values.dateOfbirth}
                              className={
                                errors.dateOfbirth && touched.dateOfbirth ? "invalid" : ""
                              }
                            />

                            {errors.dateOfbirth && touched.dateOfbirth && (
                              <div className="text-danger">{errors.dateOfbirth}</div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="lastName">
                              Mobile Number <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder="Enter mobile number"
                              onChange={handleChange}
                              value={values.phone}
                              className={
                                errors.phone && touched.phone
                                  ? "invalid"
                                  : ""
                              }
                            />
                            {errors.phone && touched.phone && (
                              <div className="text-danger">
                                {errors.phone}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                      <Col md={8}>
                          <FormGroup>
                            <Label for="dob">
                              Email <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter email"
                              onChange={handleChange}
                              value={values.email}
                              className={
                                errors.email && touched.email ? "invalid" : ""
                              }
                            />

                            {errors.email && touched.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="processDescription">
                              Status <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="select"
                              row={2}
                              name="status"
                              id="status"
                             
                              onChange={handleChange}
                              value={values.status}
                              className={
                                errors.status && touched.status ? "invalid" : ""
                              }
                            >
                              <option value="">Select status</option>
                              <option value={true}>Active</option>
                              <option value={false}>Inactive</option>
                             
                            </Input>
                            {errors.status && touched.status && (
                              <div className="text-danger">{errors.status}</div>
                            )}
                          </FormGroup>
                        </Col>

                      </Row>
                      <button type="submit" hidden ref={submitBtn}></button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            {personnel.id ? (
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
          {personnel.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {personnel.id ? (
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

export default PersonnelForm;
