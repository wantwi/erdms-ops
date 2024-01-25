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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import ActivityTable from "../table/ActivityTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSeviceActivity,
  updateActivity,
  deleteActivity,
} from "redux/serviceActivity/actions";
import Multiselect from "multiselect-react-dropdown";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Activiform.css";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";
import { setResponse } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import { useQueryClient } from "react-query";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Activity name is required"),
  days: Yup.string().required("TAT is required"),
  emailList: Yup.string().required("Email is required"),
  activityType: Yup.string().required("Process Type is required"),
  requirements: Yup.array().min(1, "Add Activity requirements"),
});

const init = {
  name: "",
  days: "",
  emailList: "",
  processOwner: [],
  activityType: "",
  requirements: [],
};

// activitytypes={activitytypes}
// owners={owners}
// defaultrequirements={defaultrequirements}

const ServiceActivityForm = ({
  activitytypes,
  owners,
  defaultrequirements,
  isClone,
  openModal,
  title,
  setOpenModal,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [requirements, setRequirements] = useState([]);
  const [selectOwner, setSelecteOwner] = useState([]);
  const [warningAlert, setWarningAlert] = useState(false);
  const activityGrid = useRef(null);
  const queryClient = useQueryClient();
  const submitBtn = useRef(null);
  const dispatch = useDispatch();
  const customApi = useCustomApi();
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const { serviceactivity } = useSelector((state) => state.seviceActitvity);
  const PostData = async (newdata) => {
    let newService = {};
    newService.code = newdata.code;
    newService.name = newdata.name;
    newService.tat = newdata.days;
    newService.maillingList = newdata.emailList;
    newService.activityTypeId = newdata.activityType;
    newService.requirementIds = newdata.requirements.map((x) => x.id);

    const response = await customApi.post("/Activities", newService);
  };
  const PutData = async (newdata) => {
    let newService = {};
    newService.code = newdata.code;
    newService.name = newdata.name;
    newService.tat = newdata.days;
    newService.maillingList = newdata.emailList;
    newService.activityTypeId = newdata.activityType;
    newService.requirementIds = newdata.requirements.map((x) => x.id);
    newService.activityId = newdata.id;
    const response = await customApi.put("/Activities", newService);
  };

  const DeleteData = async (data) => {
    const response = await customApi.delete("/Activities", {
      data: { activityId: data.id },
    });
  };

  const onPostSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("sevice-activities");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("sevice-activities");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("sevice-activities");

    setOpenModal(false);
    dispatch(setResponse(``, true));
  };

  const { mutate: postData } = usePost(PostData, onPostSuccess);
  const { mutate: putData } = usePut(PutData, onPutSuccess);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess);

  const handleSubmit = (values) => {
    serviceactivity.id && isClone === false
      ? putData(values)
      : postData(values);

    // serviceactivity.id && isClone === false
    //   ? dispatch(updateActivity(values))
    //   : dispatch(addNewSeviceActivity(values));
    setOpenModal(false);
  };

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    deleteData(serviceactivity)
    //dispatch(deleteActivity(serviceactivity));
    setOpenModal(false);
  };

  const handleClickEvent = () => {
    //dispatch(addNewDocument())
    submitBtn.current.click();
  };

  const onSelect = (args) => {
    setSelecteOwner(args);
  };

  const onRemove = (args) => {
    setSelecteOwner(args);
  };

  useEffect(() => {
    if (serviceactivity.id) {
      setRequirements(serviceactivity?.requirements);
    } else {
      setRequirements([]);
    }
  }, [serviceactivity]);

  useEffect(() => {
    
    setActiveTab("1")
    return () => {
      setActiveTab("1")
    }
  }, [])
  

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
            initialValues={serviceactivity}
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
                      Activity Details
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
                      Requirement
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
                                  <Label for="Code">Code</Label>
                                  <Input
                                    type="text"
                                    name="code"
                                    id="code"
                                    placeholder="Enter code"
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
                                  <Label for="processCode">Name</Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter name"
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
                                  {/* <Label for="days" ></Label> */}
                                  <label style={{ textAlign: "right" }}>
                                    TAT (Days)
                                  </label>
                                  <Input
                                    style={{ textAlign: "right" }}
                                    type="number"
                                    name="days"
                                    id="days"
                                    placeholder="Enter turn arround time in days"
                                    autoComplete="false"
                                    onChange={handleChange}
                                    value={values.days}
                                    className={
                                      errors.days && touched.days
                                        ? "invalid"
                                        : ""
                                    }
                                  />
                                  {errors.days && touched.days && (
                                    <div className="text-danger">
                                      {errors.days}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Label for="processDescription">
                                Escalation Mailing List
                              </Label>
                              <Input
                                type="textarea"
                                row={2}
                                name="emailList"
                                id="emailList"
                                placeholder="Select escalation mailing list (Please separate each email with a ';')"
                                onChange={handleChange}
                                value={values.emailList}
                                className={
                                  errors.emailList && touched.emailList
                                    ? "invalid"
                                    : ""
                                }
                              />
                              {errors.emailList && touched.emailList && (
                                <div className="text-danger">
                                  {errors.emailList}
                                </div>
                              )}
                            </FormGroup>

                            <Row form>
                              <Col md={4}>
                                <FormGroup>
                                  <Label for="activityType">
                                    Activity Type
                                  </Label>
                                  <Input
                                    type="select"
                                    name="activityType"
                                    id="activityType"
                                    onChange={handleChange}
                                    value={values.activityType}
                                    className={
                                      errors.activityType &&
                                      touched.activityType
                                        ? "invalid"
                                        : ""
                                    }
                                  >
                                    <option value="-1">
                                      Select activity type
                                    </option>
                                    {activitytypes.map((x) => (
                                      <option key={x.id} value={x.id}>
                                        {x.name}
                                      </option>
                                    ))}
                                  </Input>
                                  {errors.activityType &&
                                    touched.activityType && (
                                      <div className="text-danger">
                                        {errors.activityType}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                              <Col md={8}>
                                <FormGroup>
                                  {/* <Label for="processOwner">Process Owner</Label> */}

                                  {/* <Multiselect
                              options={owners}
                            hidden
                              //selectedValues={this.state.selectedValue}
                              onSelect={onSelect}
                              onRemove={onRemove}
                              placeholder=""
                              closeIcon="circle2"
                              isObject={true}
                              displayValue="name" 
                              
                             /> */}
                                </FormGroup>

                                {/* <FormGroup>
                              <Label for="processOwner">Process Owner</Label>
                              <Input

                                 multiple={true}
                                type="select"
                                name="processOwner"
                                id="processOwner"
                                onChange={handleChange}
                                value={values.processOwner}
                                className={
                                  errors.processOwner && touched.processOwner
                                    ? "invalid"
                                    : ""
                                }
                              >
                                <option>Select process owner</option>
                                <option>William Antwi-Boasiako</option>
                                <option>Micheal Nartey</option>
                                <option>Eric Boateng</option>
                                <option>Enoch Enchill</option>
                                <option>Yoavi Gavor</option>
                              </Input>
                              {errors.processOwner && touched.processOwner && (
                                <div className="text-danger">
                                  {errors.processOwner}
                                </div>
                              )}
                            </FormGroup> */}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}></Col>
                            </Row>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row className="mt-10">
                      <ActivityTable
                        requirementData={requirements}
                        setRequirements={setRequirements}
                        activityGrid={activityGrid}
                      />

                      {!requirements ? (
                        <div className="text-danger">
                          {errors.activityRequirements}
                        </div>
                      ) : null}
                    </Row>
                  </TabPane>
                  <input
                    hidden
                    name="requirements"
                    onChange={handleChange}
                    value={(values.requirements = requirements)}
                  />
                  {errors.requirements && touched.requirements && (
                    <div className="text-danger">{errors.requirements}</div>
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
          {serviceactivity.id && isClone === false ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {serviceactivity.id && isClone === false ? (
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

export default ServiceActivityForm;
