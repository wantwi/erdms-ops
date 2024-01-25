import React,{useEffect, useRef,useState} from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch,useSelector } from "react-redux";
import {
  updateRequirement,
  addNewRequirement,
  deleteRequirement,
  getSelectedRequirement
} from "../../../../redux/requirementSetup/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { getAllRegulatoryOptions } from "redux/regulatoryOption/action";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";
import { hideLoader, setResponse, showLoader } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";
import { useQueryClient } from "react-query";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Requirement name is required"),
  requirementTypeId: Yup.string().required("Document type is required"),
  requirementAction: Yup.string().required("Requirement action is required"),
  documentId:Yup.string().required("Requirement document is required"),
  status: Yup.date().required("Status is required"),
});


const RequirementSetupForm = ({documents,requirementActions,requirementTypes,regulatoryOptions, openModal,title, setOpenModal }) => {
  const dispatch = useDispatch();
  const submitBtn = useRef(null)
  // const { documents } = useSelector((state) => state.documentSetup);
  const [warningAlert, setWarningAlert] = useState(false);
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

   const {requirement } = useSelector((state) => state.requirementSetup);
  // const { regulatoryOptions} = useSelector(state => state.regulatoryOptionState)

  const PostData = async (newdata) => {
    dispatch(showLoader());
    let newRequirement ={}
    newRequirement.code = newdata.code
    newRequirement.name = newdata.name
    newRequirement.documentId = newdata.documentId
    newRequirement.requirementTypeId = newdata.requirementTypeId
    newRequirement.requirementActionId = newdata.requirementAction
    newRequirement.status = newdata.status === "1" ? true : false
    newRequirement.regulatoryOptionId =  newdata?.regulatoryOptionId === "" ? "00000000-0000-0000-0000-000000000000" :  newdata?.regulatoryOptionId
    
    const response = await customApi.post("/Requirements", newRequirement);
  };
  const PutData = async (newdata) => {
    dispatch(showLoader());
    let newRequirement ={}
    newRequirement.code = newdata.code
    newRequirement.name = newdata.name
    newRequirement.documentId = newdata.documentId
    newRequirement.requirementTypeId = newdata.requirementTypeId
    newRequirement.requirementActionId = newdata.requirementAction
    newRequirement.status = newdata.status === "1" ? true : false
    newRequirement.requirementId= newdata.id
    newRequirement.regulatoryOptionId = newdata.regulatoryOptionId
    
    const response = await customApi.put("/Requirements",newRequirement);
  };
  const DeleteData = async (data) => {
    dispatch(showLoader());
    const response = await customApi.delete("/Requirements", {
      data: { requirementId: data.id },
    });
  };
  
  
  const onPostSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("requirements");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("requirements");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("requirements");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  
  const onError = () => {
    dispatch(hideLoader());
  }
  
  const { mutate: postData } = usePost(PostData, onPostSuccess,onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess, onError);


  const handleDelete =()=>{
    // setOpenModal(false)
    // dispatch(deleteRequirement(requirement))
    setWarningAlert(true)
  }

  const onConfirm = () =>{
    setWarningAlert(!warningAlert)
    deleteData(requirement)
   // dispatch(deleteRequirement(requirement))
    setOpenModal(false);
  }
  
  const handleClickEvent = ()=>{
    //dispatch(addNewDocument())
    submitBtn.current.click()
  }
  

  
  const handleSubmit = (values) => {


   // requirement.id ?  dispatch(updateRequirement(values)) : dispatch(addNewRequirement(values))
    requirement.id ?  putData(values) : postData(values)
    setOpenModal(false)
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
      <Modal
        isOpen={openModal}
       
        size="lg"
        //className={className}
      >
        <ModalHeader style={{background:"#e0e6ef", borderBottom:"1px solid #563c91"}}>
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>
      <Row>
        <Col sm="12">
          <div className="doc-title mt-10">
            <Formik
              initialValues={requirement}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange, touched }) => (
                <Form>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processCode">Code <span className="isRequire">*</span></Label>
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
                          <div className="text-danger">{errors.code}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={8}>
                      <FormGroup>
                        <Label for="processType">Requirement Name <span className="isRequire">*</span></Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter requirement name"
                          onChange={handleChange}
                          value={values.name}
                          className={
                            errors.name && touched.name ? "invalid" : ""
                          }
                        />
                        {errors.name && touched.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processType">Requirement type <span className="isRequire">*</span></Label>
                        <Input
                          type="select"
                          name="requirementTypeId"
                          id="requirementTypeId"
                        
                          onChange={handleChange}
                          value={values.requirementTypeId}
                          className={
                            errors.requirementTypeId && touched.requirementTypeId ? "invalid" : ""
                          }
                        >
                          <option value="">Select requirement type </option>
                          {
                            requirementTypes.map(x => <option key={x.id} value={x.id}>{x.name}</option> )
                          }
                        
                        </Input>
                        {errors.requirementTypeId && touched.requirementTypeId && (
                          <div className="text-danger">{errors.requirementTypeId}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processType">Requirement Action <span className="isRequire">*</span></Label>
                        <Input
                          type="select"
                          name="requirementAction"
                          id="requirementAction"
                          onChange={handleChange}
                          value={values.requirementAction}
                          className={
                            errors.requirementAction && touched.requirementAction ? "invalid" : ""
                          }
                        >
                          <option value="-1">Select requirement action</option>
                          {
                            requirementActions.map(x => <option key={x.id} value={x.id}>{x.name}</option> )
                          }
                        </Input>
                        {errors.requirementAction && touched.requirementAction && (
                          <div className="text-danger">{errors.requirementAction}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processStatus">Require Document</Label>
                        <Input
                          type="select"
                          name="documentId"
                          id="documentId"
                          onChange={handleChange}
                          value={values.documentId}
                          className={
                            errors.documentId && touched.documentId ? "invalid" : ""
                          }
                         
                        >
                          <option value="">Select require document </option>
                          {
                            documents.map(x =>  <option key={x.id} value={x.id}>{x.name}</option> )
                          }
                         
                        </Input>
                        {errors.documentId && touched.documentId && (
                          <div className="text-danger">{errors.documentId}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processStatus">Status <span className="isRequire">*</span></Label>
                        <Input
                          type="select"
                          name="status"
                          id="processStatus"
                          onChange={handleChange}
                          value={values.status}
                          className={
                            errors.status && touched.status ? "invalid" : ""
                          }
                        >
                          <option value="">Select status</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </Input>
                        {errors.status && touched.status && (
                          <div className="text-danger">{errors.status}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="processStatus">Regulatory Option <span className="isRequire"></span></Label>
                        <Input
                          type="select"
                          name="regulatoryOptionId"
                          id="regulatoryOptionId"
                           onChange={handleChange}
                           value={values.regulatoryOptionId}
                          // className={
                          //   errors.status && touched.status ? "invalid" : ""
                          // }
                        >

                          
                          <option value="00000000-0000-0000-0000-000000000000">Select option </option>
                          {
                            regulatoryOptions.map(x =>  <option key={x.id} value={x.id}>{x.name}</option> )
                          }
                        </Input>
                        {/* {errors.status && touched.status && (
                          <div className="text-danger">{errors.status}</div>
                        )} */}
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
        <Button
            className="c-secondary"
           
             onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          {
             requirement.id ? <Button
            className="c-danger"
           
             onClick={() => handleDelete()}
          >
           Delete
          </Button> : null
          }
          <Button
            className="c-primary"
             onClick={handleClickEvent}
           
          >
            {
               requirement.id ? <><span><i className="fa fa-edit"></i> </span> Update</> : <><span><i className="fa fa-save"></i> </span> Save</>
            }
            
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RequirementSetupForm;
