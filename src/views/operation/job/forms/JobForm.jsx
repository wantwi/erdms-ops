import React, { Fragment, useState, useRef, useEffect } from "react";
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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import classnames from "classnames";

import Multiselect from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { createJob, updateJob } from "redux/job/action";
import { CustomAxios } from "util/customAxios";
import { setResponse, showLoader, hideLoader } from "redux/loader/Loader";
import ServiceSelectionTable from "../table/ServiceSelectionTable";
import ServiceTable from "../table/ServiceTable";
import RegulatoryTable from "../table/RegulatoryTable";
import { xor, xorBy } from "lodash";
import useCustomApi from "api/useCustomApi";
import { usePost, usePut } from "hooks/useMutateInfo";
import { useQueryClient } from "react-query";
const schema = Yup.object().shape({
  customer: Yup.string().required("Service type is required"),
  selectedServices: Yup.array().min(1, "Service(s) is required"),
  branchId: Yup.string().required("Branch is required"),
  financeId: Yup.string().required("Financing option is required"),
  requestDate: Yup.date().required("Request date is required"),
  processOwner: Yup.array().min(1, "Job owener(s) is required"),
});

const JobForm = ({
  setJobRegulatoryOpt,
  jobRegulatoryOpt,
  openModal,
  title,
  setOpenModal,
  processowners, 
  serviceprocess,
  financeOptions, 
  branches,
  regulatoryOptions
}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [customer, setCustomer] = useState({});
  const [owners, setOwners] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedService, setSelecteService] = useState([]);
  const [ucrNumber, setUcrNumber] = useState("")

  const [selectedRegulatoryOptions, setSelectedRegulatoryOptions] = useState(
    jobRegulatoryOpt
  );
  const regTableRef = useRef(null);

  const [regulatoryOption, setRegulatoryOption] = useState([]);
  const [services, setServices] = useState([]);
  const [istaxedExmpt, setIsTaxedExmpt] = useState("");
  const submitBtn = useRef(null);
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

 
  const { job } = useSelector(
    (state) => state.jobState
  );

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onSelect = (values) => {
    setOwners(values);
  };
  const onRemove = (values) => {
    setOwners(values);
  };

  const handleClickEvent = () => {
    submitBtn.current.click();
  };

  const PostData = async (data) => {
    dispatch(showLoader());
    let jobData = {
      customerId: data.customer.id,
      services: data.selectedServices.map((x,i) =>({serviceId: x.id, sequence:i+1})),
      branchId: data.branchId,
      financingOptionId: data.financeId,
      requestedAt: data.requestDate,
      isTaxExemption: data.customer.taxExempt,
      remarks: data.remarks,
      jobOwnerIds: data.processOwner.map((x) => x.id),
    };

   
    const job = await customApi.post(`Job`, jobData);
  };

  const PutData = async ({data, jobId}) => {
    dispatch(showLoader());
    const renderData = data.map((x,i)=>({
      serviceId:x?.serviceId||x?.id,
      sequence: x?.serviceSequence ===null || x?.serviceSequence ===undefined ? 1+i : i+1,
      activities: x?.activities.map(y =>({...y}))}))
    
    renderData.forEach(item => {
      if(item.activities.length === 0){
        delete item.activities
      }
      
    });
    const updateJob = await customApi.put(`Job`,{jobId, remarks:"",services:renderData, ucrNumber});    
  };


  const onPostSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("jobs");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("jobs");
    setOpenModal(false);
    dispatch(setResponse(``, true));
    setUcrNumber("")
  };

  const onError = () => {
    dispatch(hideLoader());
  }

  const { mutate: postData } = usePost(PostData, onPostSuccess,onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);

  const handleSubmit = (values) => {
    if (job?.id) {
   

      let arr = [];

      let posts = [];
      jobRegulatoryOpt.map((v, k) => {
        let regx = v.jobRegulatoryRequiements.map((x) => x.id);
        let activities = [],
          activity = {
            activityId: v.activityId,
            regulatoryRequiements: regx,
          };

        let foundPost = posts.find((x) => x.serviceId === v.serviceId);
        if (foundPost && foundPost.serviceId) {
          foundPost.activities.push(activity);
        } else {
          activities.push(activity);
          let post = {
            serviceId: v.serviceId,
            activities,
            serviceSequence: v?.serviceSequence || v?.sequence,
          };

          posts.push(post);
        }
      });

      console.log({ posts: regTableRef?.current?.currentViewData });

      
      const formatedSelecedService = selectedService.map((x) => ({
        serviceId: x?.id || x?.serviceId,
        ...x,
      }));

      formatedSelecedService.forEach((x) => {
        let obj = posts.find((y) => y?.serviceId === x?.serviceId);
        if (!obj) {
          arr.push(x);
        }
      });

      // console.log({selectedService,posts, arr})

      const finalResult = [
        ...posts,
        ...arr.map((x) => ({
          serviceId: x?.serviceId || x?.id,
          activities: [],
        })),
      ];

      //dispatch(updateJob(finalResult, job.id));
      let data ={data: finalResult, jobId:job.id}

     // console.log({putData:data })
      putData(data)
      //setRegulatoryOption([]);
    } else {
      // dispatch(createJob(values));
       postData(values)
      // console.log({putData2:values })
    }

   
  };

  useEffect(() => {
    if (job?.id) {
      setIsTaxedExmpt(job?.taxExempt ? "Yes" : "No");
      setSelecteService(job?.jobServices || []);
      setOwners(job?.jobOwners);
      setUcrNumber(job?.ucrNumber||"")
    }
    return () => {
      setSelecteService([]);
      setOwners([]);
      setSelectedRegulatoryOptions([]);
    };
  }, [job]);

  const handleCusChange = (args) => {
    let val = args[0];
    setCustomer(args[0]);
  };

  const onBlur = () => {
    setTimeout(() => setIsTaxedExmpt(customer?.taxExempt ? "Yes" : "No"), 500);
  };

  const handleSearch = (query) => {
    setIsLoading(true);

    customApi.get(`Job/Customers/Approved?filter=${query}&results=10`)
      .then((res) => {
        const options = res.data.items.map((i) => ({
          id: i.id,
          name: i.name,
          taxExempt: i.taxExempt,
        }));

        setOptions(options);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(setResponse(error.response.data.errors[0].message, false));
      });
  };

  const filterBy = () => true;
  return (
    <div>
      <Modal
        isOpen={openModal}
        size="xl"
        //className={className}
      >
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>
            {(title = job?.id ? `Job Number: ${job.jobNumber}` : title)}
          </span>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={job}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, touched }) => (
              <Form encType="multipart/form-data">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      title="Job Details"
                      className={classnames(
                        { active: activeTab === "1" },
                        "doc-title"
                      )}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Job Details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      title="Service"
                      className={classnames(
                        { active: activeTab === "2" },
                        "doc-title"
                      )}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Service
                    </NavLink>
                  </NavItem>
                  {job?.id ? (
                    <NavItem>
                      <NavLink
                        title="Regulatory Option"
                        className={classnames(
                          { active: activeTab === "3" },
                          "doc-title"
                        )}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Regulatory Option
                      </NavLink>
                    </NavItem>
                  ) : null}
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <div className="doc-title mt-10">
                      
                          <Row>
                          {job?.id ?<Col md={3}>
                              <FormGroup>
                                <Label for="processType">UCR Number</Label>
                                <Input
                                 disabled={job?.ucrNumber ? true:false}
                                  type="text"
                                  name="ucrNumber"
                                  id="ucrNumber"
                                   onChange={(e) => setUcrNumber(e.target.value)}
                                  value={ucrNumber ||""}
                                />

                              
                              </FormGroup>
                            </Col>: null}
                            <Col md={job?.id ? 6: 9}>
                              <FormGroup>
                                <Label for="processCode">
                                  Customer <span className="isRequire">*</span>
                                </Label>
                                <AsyncTypeahead
                                  disabled={job?.id ? true : false}
                                  filterBy={filterBy}
                                  id="async-example"
                                  isLoading={isLoading}
                                  labelKey="name"
                                  minLength={3}
                                  onSearch={handleSearch}
                                  options={options}
                                  onBlur={onBlur}
                                  onChange={handleCusChange}
                                  placeholder="Search for a customer..."
                                  defaultSelected={job?.cusArry || []}
                                  value={(values.customer = customer)}
                                  renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                      <span style={{ fontSize: 12 }}>
                                        {option.name}
                                      </span>
                                    </Fragment>
                                  )}
                                />
                                {errors?.customer && touched?.customer && (
                                  <div className="text-danger">
                                    {errors?.customer}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={3}>
                              <FormGroup>
                                <Label for="processType">Tax Exempted</Label>
                                <Input
                                  disabled
                                  type="text"
                                  name="taxExempt"
                                  id="taxExempt"
                                  // onChange={handleChange}
                                  // value={values.industryId}

                                  value={istaxedExmpt}
                                />

                                {/* {
                            industries.map(x =>  <option value={x.id}>{x.name}</option>)
                          } */}
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="processType">
                                  Branch <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  disabled={job?.id ? true : false}
                                  type="select"
                                  name="branchId"
                                  id="branchId"
                                  onChange={handleChange}
                                  value={values.branchId}
                                  className={
                                    errors.branchId && touched.branchId
                                      ? "invalid"
                                      : ""
                                  }
                                >
                                  <option>Select Branch</option>

                                  {branches.map((x) => (
                                    <option value={x.id}>{x.name}</option>
                                  ))}
                                </Input>
                                {errors.branchId && touched.branchId && (
                                  <div className="text-danger">
                                    {errors.branchId}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="processType">
                                  Financing Option{" "}
                                  <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  disabled={job.id ? true : false}
                                  type="select"
                                  name="financeId"
                                  id="financeId"
                                  onChange={handleChange}
                                  value={values.financeId}
                                  className={
                                    errors.financeId && touched.financeId
                                      ? "invalid"
                                      : ""
                                  }
                                >
                                  <option>Select financing option</option>
                                  {financeOptions.map((x) => (
                                    <option value={x.id}>{x.name}</option>
                                  ))}
                                </Input>
                                {errors.financeId && touched.financeId && (
                                  <div className="text-danger">
                                    {errors.financeId}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="">
                                  Request Date{" "}
                                  <span className="isRequire">*</span>
                                </Label>
                                <Input
                                  disabled={job?.id ? true : false}
                                  type="date"
                                  name="requestDate"
                                  id=""
                                  placeholder="request date"
                                  onChange={handleChange}
                                  value={values.requestDate}
                                  className={
                                    errors.requestDate && touched.requestDate
                                      ? "invalid"
                                      : ""
                                  }
                                />
                                {errors.requestDate && touched.requestDate && (
                                  <div className="text-danger">
                                    {errors.requestDate}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row></Row>
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <Label for="digitalAddress">
                                  Job Owner(s){" "}
                                  <span className="isRequire">*</span>
                                </Label>
                                <Multiselect
                                  disabled={job?.id ? true : false}
                                  options={processowners}
                                  hidden
                                  selectedValues={job?.arr || []}
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
                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <Label for="digitalAddress">Remarks</Label>
                                <Input
                                  disabled={job?.id ? true : false}
                                  type="textarea"
                                  name="remarks"
                                  row={3}
                                  id=""
                                  placeholder="Remarks"
                                  onChange={handleChange}
                                  value={values.remarks}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <ServiceTable
                      selectedData={selectedService}
                      setSelecteService={setSelecteService}
                      setShow={setShowTable}
                    />
                  </TabPane>

                  <TabPane tabId="3">
                    <RegulatoryTable
                      setServices={setServices}
                      services={services}
                      data={jobRegulatoryOpt}
                      setJobRegulatoryOpt={setJobRegulatoryOpt}
                      setShow={setShowTable}
                      selectedService={selectedService}
                      regulatoryOption={regulatoryOption}
                      setRegulatoryOption={setRegulatoryOption}
                      regTableRef={regTableRef}
                    />
                  </TabPane>
                </TabContent>

                <input
                  hidden
                  name="selectedServices"
                  onChange={handleChange}
                  value={(values.selectedServices = selectedService)}
                />
                {errors.selectedServices && touched.selectedServices && (
                  <div className="text-danger">{errors.selectedServices}</div>
                )}
                <button type="submit" hidden ref={submitBtn}></button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            {job.id ? (
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
          {!job.id ? (
            <Button className="c-primary" onClick={handleClickEvent}>
              <span>
                <i className="fa fa-save"></i>{" "}
              </span>{" "}
              Save
            </Button>
          ) : (
            <Button className="c-primary" onClick={handleClickEvent}>
              Update
            </Button>
          )}{" "}
        </ModalFooter>
      </Modal>

      <ServiceSelectionTable
        data={activeTab === "3" ? regulatoryOptions : serviceprocess}
        setSelecteService={
          activeTab === "3" ? setSelectedRegulatoryOptions : setSelecteService
        }
        setShowTable={setShowTable}
        showTable={showTable}
      />
    </div>
  );
};

export default JobForm;
