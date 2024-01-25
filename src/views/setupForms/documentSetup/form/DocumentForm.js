import React, { useRef, useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import useCustomApi from "api/useCustomApi";
import { useQueryClient } from "react-query";
import { setResponse, showLoader, hideLoader } from "redux/loader/Loader";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Document name is required"),
  description: Yup.string().required("Description is required"),
  docType: Yup.string().required("Document type is required"),
  status: Yup.date().required("Status is required"),
});

const DocumentForm = ({ documentTypes, openModal, title, setOpenModal }) => {
  const submitBtn = useRef(null);
  const dispatch = useDispatch();
  // const [successAlert, setSuccessAlert] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

  const PostData = async (data) => {
    dispatch(showLoader());
    let newDoc = {};
    newDoc.code = data.code;
    newDoc.name = data.name;
    newDoc.description = data.description;
    newDoc.documentTypeId = data.docType;
    newDoc.status = data.status === "1" ? true : false;
    const response = await customApi.post("/Documents", newDoc);
  };
  const PutData = async (newdata) => {
    dispatch(showLoader());
    let newDoc = {};
    newDoc.code = newdata.code;
    newDoc.name = newdata.name;
    newDoc.description = newdata.description;
    newDoc.documentTypeId = newdata.docType;
    newDoc.status = newdata.status === "1" ? true : false;
    newDoc.documentId = newdata.id;
    const response = await customApi.put("/Documents", newDoc);
  };
  const DeleteData = async (data) => {
    dispatch(showLoader());
    const response = await customApi.delete("/Documents", {
      data: { documentId: data.id },
    });
  };

  const onPostSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("documents");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("documents");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(hideLoader());
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("documents");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };

  const onError = () => {
    dispatch(hideLoader());
  }

  const { mutate: postData } = usePost(PostData, onPostSuccess,onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess, onError);

  const { document } = useSelector((state) => state.documentSetup);

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    deleteData(document);

    setOpenModal(false);
  };

  const handleClickEvent = () => {
    submitBtn.current.click();
  };

  const handleSubmit = (values) => {
    document?.id ? putData(values) : postData(values);
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
        
      >
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              <div className="doc-title mt-10">
                <Formik
                  initialValues={document}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, handleChange, touched }) => (
                    <Form>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="name">
                              Code <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="code"
                              id="code"
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
                            <Label for="name">
                              Name <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter name"
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
                      <FormGroup>
                        <Label for="processDescription">
                          Description <span className="isRequire">*</span>
                        </Label>
                        <Input
                          type="textarea"
                          row={2}
                          name="description"
                          id="description"
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
                              Document Type <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="select"
                              name="docType"
                              id="processType"
                              onChange={handleChange}
                              value={values.docType}
                              className={
                                errors.docType && touched.docType
                                  ? "invalid"
                                  : ""
                              }
                            >
                              <option value="">Select document type</option>
                              {documentTypes.map((x) => (
                                <option key={x.id} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </Input>
                            {errors.docType && touched.docType && (
                              <div className="text-danger">
                                {errors.docType}
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
            {document.id ? (
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
          {document.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {document.id ? (
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

export default DocumentForm;
