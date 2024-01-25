import React, { useRef, useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { deleteRole } from "redux/roles/action";
import { useDispatch } from "react-redux";
import { useDelete, usePost, usePut } from "hooks/useMutateInfo";
import { useQueryClient } from "react-query";
import useCustomApi from "api/useCustomApi";
import { setResponse } from "redux/loader/Loader";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Equipment name is required"),
  status: Yup.boolean().required("Sataus is required"),
});

const EquipmentTypeForm = ({ openModal, title, setOpenModal, role }) => {
  const [warningAlert, setWarningAlert] = useState(false);
  const queryClient = useQueryClient();
  const customApi = useCustomApi();
  const submitBtn = useRef();
  const dispatch = useDispatch();

  const PostData = async (data) => {
    const response = await customApi.post("/Roles",  {...data,status: data.status === true ? 1 : 0});
  };
  const PutData = async (data) => {
    const response = await customApi.put("/Roles", {...data,status: data.status === true ? 1 : 0});
  };
  const DeleteData = async (data) => {
    const response = await customApi.delete("/Roles", {
      data: { roleId: data.id },
    });
  };

  const onPostSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("roles");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onPutSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("roles");
    setOpenModal(false);
    dispatch(setResponse(``, true));
  };
  const onDeleteSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("roles");

    setOpenModal(false);
    dispatch(setResponse(``, true));
  };

  const { mutate: postData } = usePost(PostData, onPostSuccess);
  const { mutate: putData } = usePut(PutData, onPutSuccess);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess);

  const handleClickEvent = () => {
    submitBtn.current.click();
  };

  const handleSubmit = (values) => {
    values.status =
      values.status === "true" || values.status === true ? true : false;

    role?.id ? putData({ ...values, roleId: role.id }) : postData(values);
  };

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    // { data: { roleId: newdata.id } }
    deleteData(role);
    setOpenModal(false);
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
      <Modal isOpen={openModal} size="md">
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
                  initialValues={role}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, handleChange, touched }) => (
                    <Form>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="code">
                              Code <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="code"
                              id="code"
                              placeholder="Enter Code "
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
                              placeholder="Enter Name"
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
                        <Col md={12}>
                          <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                              type="textarea"
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
                        </Col>
                      </Row>
                      <Row form>
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
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
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
            {role.id ? (
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
          {role.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {role.id ? (
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

export default EquipmentTypeForm;
