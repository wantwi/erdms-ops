import React, { useRef, useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux";
import {
  usePost,
  usePut,
  useDelete,
} from "hooks/equipmentType/useEquipmentTypeQuery";
import useCustomApi from "api/useCustomApi";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { useQueryClient } from "react-query";

let schema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Equipment name is required"),
  status: Yup.boolean().required("Sataus is required"),
});

const EquipmentTypeForm = ({ openModal, title, setOpenModal, equipment }) => {
  const [warningAlert, setWarningAlert] = useState(false);
  // const [equipmentTypes, setequipmentTypes] = useState([]);
  const submitBtn = useRef();
  const dispatch = useDispatch();
  const customApi = useCustomApi();
  const queryClient = useQueryClient();

  const handleClickEvent = () => {
    submitBtn.current.click();
  };

  const PostData = async (data) => {
    dispatch(showLoader())
    const response = await customApi.post("/Equipments/Type", data);
  };
  const PutData = async (data) => {
    dispatch(showLoader())
    const response = await customApi.put("/Equipments/Type", data);
  };
  const DeleteData = async (data) => {
    dispatch(showLoader())
    const response = await customApi.delete("/Equipments/Type", data);
  };

  const onPostSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("equipment-types");
    setOpenModal(false);
    dispatch(setResponse(``, true));
    dispatch(hideLoader())
  };
  const onPutSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("equipment-types");
    setOpenModal(false);
    dispatch(setResponse(``, true));
    dispatch(hideLoader())
  };
  const onDeleteSuccess = () => {
    dispatch(setResponse(`Successful`, true));
    queryClient.invalidateQueries("equipment-types");

    setOpenModal(false);
    dispatch(setResponse(``, true));
    dispatch(hideLoader())
  };

  const onError = () => {
    dispatch(hideLoader())
  }

  const { mutate: postData } = usePost(PostData, onPostSuccess, onError);
  const { mutate: putData } = usePut(PutData, onPutSuccess, onError);
  const { mutate: deleteData } = useDelete(DeleteData, onDeleteSuccess, onError);

  const handleSubmit = (values) => {
    values.status =
      values.status === "true" || values.status === true ? true : false;

    equipment?.id
      ? putData({ ...values, equipmentId: equipment.id })
      : postData(values);
  };

  const handleDelete = () => {
    setWarningAlert(true);
  };

  const onConfirm = () => {
    setWarningAlert(!warningAlert);
    deleteData(equipment);
    setOpenModal(false);
  };

  console.log({ equipment });
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
                  initialValues={equipment}
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
            {equipment.id ? (
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
          {equipment.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {equipment.id ? (
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
