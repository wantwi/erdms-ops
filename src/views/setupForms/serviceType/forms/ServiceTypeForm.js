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
import ActivityTable from "../table/ActivityTable";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addNewSeviceProcess,
  updateProcess,
  deleteProcess,
  addCloneSeviceProcess,
} from "redux/serviceProcess/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { getAllSeviceActivity } from "redux/serviceActivity/actions";
import { hideLoader, setResponse, showLoader } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";
import { useQueryClient } from "react-query";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Activity name is required"),
  description: Yup.string().required("Description is required"),
  processType: Yup.string().required("Process type is required"),
  status: Yup.string().required("Status is required"),
  activities: Yup.array().min(1, "Activity is required"),
});

// const init = {
//   code: "",
//   name: "",
//   description: "",
//   processType: "",
//   status: "",
//   processOwner: [],
//   activities: [],
// };

// processtypes={processtypes}
// processowners ={processowners}

const ServiceTypeForm = ({
  isClone,
  openModal,
  title,
  setOpenModal,
  activities,
  setActivities,
  processtypes,
  processowners
}) => {
  const dispatch = useDispatch();
  const submitBtn = useRef(null);
  const [activeTab, setActiveTab] = useState("1");
  const [owners, setOwners] = useState([]);
  const [warningAlert, setWarningAlert] = useState(false);
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

  const PostData = async (newdata) => {
    dispatch(showLoader());
    newdata.serviceTypeId =newdata.processType
    newdata.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))
    newdata.activities = newdata.activities.map(x =>({activityId:x?.activityId,sequence:x.sequence}))
    newdata.status = newdata.status === "1" ? true : false;
    
    const response = await customApi.post("/Services", newdata);
  };
  const PutData = async (newdata) => {
    dispatch(showLoader());
    let newObj = {}

  newObj.code = newdata.code
  newObj.name = newdata.name
  newObj.description = newdata.description
  newObj.serviceTypeId = newdata.processType
  newObj.serviceId = newdata.id
  newObj.status = newdata.status === "1" ? true : false;
  newObj.activities = newdata.activities.map(x =>({activityId:x?.id || x?.activityId,sequence:x.sequence})).sort((a,b) => a.sequence - b.sequence)
  newObj.serviceOwnerIds = newdata.processOwner.map(x =>(x.id))
   
    
    const response = await customApi.put("/Services",newObj);
  };
  const DeleteData = async (data) => {
    dispatch(showLoader());
    const response = await customApi.delete("/Services", {
      data: { serviceId: data.id },
    });
  };
  
  
  const onPostSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("service-process");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("service-process");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("service-process");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  
  const onError = () => {
    dispatch(hideLoader());
  }
  
  const { mutate: postData } = usePost(PostData, onPostSuccess,onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess, onError);





  const { process } = useSelector(
    (state) => state.ServiceProcess
  );

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const orderActivities = (data) => {
    return [...new Set(data)].map((x, i) => ({
      activityId: x?.id || x?.activityId,
      sequence: i + 1,
    }));
  };

  const handleSubmit = (values) => {
    values.activities = orderActivities(values.activities);

    if (process.id && isClone === false) {
      values.id = process.id;
      //console.log({values})
      putData({
        ...values,
        activities: orderActivities(values.activities),
      })
      // dispatch(
      //   updateProcess({
      //     ...values,
      //     activities: orderActivities(values.activities),
      //   })
      // );
    } else {
      if (isClone === true) {
        //values.activities = values.activities.map(x =>({activityId:x.id,sequence:x.sequence}))

        let clone = {
          ...values,
          activities: orderActivities(values.activities),
        };

        console.log({ clone });
        postData(clone)
        //dispatch(addCloneSeviceProcess(clone));
      } else {
        postData(values)
        // dispatch(addNewSeviceProcess(values));
      }
    }

    setOpenModal(false);
  };

  const handleDelete = () => {
    setWarningAlert(!warningAlert);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    deleteData(process)
    // dispatch(deleteProcess(process));
    setOpenModal(false);
  };

  const handleClickEvent = () => {
    //dispatch(addNewDocument())
    submitBtn.current.click();
  };

  const onSelect = (values) => {
    setOwners(values);
  };
  const onRemove = (values) => {
    setOwners(values);
  };

  useEffect(() => {
    if (process.id) {
      setOwners(process.processOwner);
      setActivities(process?.activities || []);
    }
  }, [process]);
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
            initialValues={{
              code: process.code,
              name: process.name,
              description: process.description,
              status: process.status,
              processType: process.processType,
              activities: process.activities,
              processOwner: process.processOwner,
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, touched }) => (
              <Form>
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
                      Process Header Details
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
                      Activities
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <div className="doc-title mt-10">
                          <Row form>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="processCode">
                                  Code <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="code"
                                  id="processCode"
                                  placeholder="Enter code"
                                  onChange={handleChange}
                                  value={values.code}
                                  className={
                                    errors.code && touched.code ? "invalid" : ""
                                  }
                                />
                                {errors.code && touched.code && (
                                  <div className="text-danger">
                                    {errors.code}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={8}>
                              <FormGroup>
                                <Label for="processName">
                                  Name <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="name"
                                  id="processName"
                                  placeholder="Enter name"
                                  autoComplete="false"
                                  onChange={handleChange}
                                  value={values.name}
                                  className={
                                    errors.name && touched.name ? "invalid" : ""
                                  }
                                />
                                {errors.name && touched.name && (
                                  <div className="text-danger">
                                    {errors.name}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label for="processDescription">
                              Description <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="textarea"
                              row={2}
                              name="description"
                              id="processDescription"
                              placeholder="Enter description"
                              onChange={handleChange}
                              value={values.description}
                              className={
                                errors.description && touched.description
                                  ? "invalid"
                                  : ""
                              }
                            />
                            {errors.description && touched.description && (
                              <div className="text-danger">
                                {errors.description}
                              </div>
                            )}
                          </FormGroup>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="processType">
                                  Process Type{" "}
                                  <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  type="select"
                                  name="processType"
                                  id="processType"
                                  onChange={handleChange}
                                  value={values.processType}
                                  className={
                                    errors.processType && touched.processType
                                      ? "invalid"
                                      : ""
                                  }
                                >
                                  <option value="-1">
                                    Select process type
                                  </option>
                                  {processtypes.map((x) => (
                                    <option key={x.id} value={x.id}>
                                      {x.name}
                                    </option>
                                  ))}
                                </Input>
                                {errors.processType && touched.processType && (
                                  <div className="text-danger">
                                    {errors.processType}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="processStatus">
                                  Status <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  type="select"
                                  name="status"
                                  id="processStatus"
                                  onChange={handleChange}
                                  value={values.status}
                                  className={
                                    errors.status && touched.status
                                      ? "invalid"
                                      : ""
                                  }
                                >
                                  <option value="-1">Select status</option>
                                  <option value="1">Active</option>
                                  <option value="0">Inactive</option>
                                </Input>
                                {errors.status && touched.status && (
                                  <div className="text-danger">
                                    {errors.status}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <Label for="processOwner">Process Owner</Label>
                                <Multiselect
                                  options={processowners}
                                  hidden
                                  selectedValues={process.processOwner}
                                  onSelect={onSelect}
                                  onRemove={onRemove}
                                  placeholder=""
                                  closeIcon="circle2"
                                  isObject={true}
                                  displayValue="name"
                                  name="processOwner"
                                  onChange={handleChange}
                                  value={(values.processOwner = owners)}
                                />
                                {errors.processOwner &&
                                  touched.processOwner && (
                                    <div className="text-danger">
                                      {errors.processOwner}
                                    </div>
                                  )}
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row className="mt-10">
                      <ActivityTable
                        
                        currData={activities}
                        setCurrData={setActivities}
                      />
                    </Row>
                  </TabPane>
                  <input
                    hidden
                    name="activities"
                    onChange={handleChange}
                    value={(values.activities = activities)}
                  />
                  {errors.activities && touched.activities && (
                    <div className="text-danger">{errors.activities}</div>
                  )}
                </TabContent>
                <button type="submit" hidden ref={submitBtn}></button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          {process.id && isClone === false ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {process.id && isClone === false ? (
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

export default ServiceTypeForm;
