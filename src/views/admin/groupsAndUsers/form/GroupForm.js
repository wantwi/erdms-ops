import React, { useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import AppTable from "../table/AppTable"
import SegTable from "../table/SegTable"

const GroupForm = ({ openModal, setOpenModal, title, apps }) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = (value) => {
    setActiveTab(value);
  };
  const handleSubmit = () => {
    console.log("ok");
  };
  return (
    <div>
      {" "}
      <Modal isOpen={openModal} size="lg">
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
                  initialValues={{ name: "" }}
                  //   validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, handleChange, touched }) => (
                    <Form>
                      <Row form>
                        <Col md={8}>
                          <FormGroup>
                            <Label for="staffId">
                              Name <span className="isRequire">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="staffId"
                              id="staffId"
                              placeholder="Enter group name "
                              //   onChange={handleChange}
                              //   value={values.staffId}
                              //   className={
                              //     errors.staffId && touched.staffId
                              //       ? "invalid"
                              //       : ""
                              //   }
                            />
                            {/* {errors.staffId && touched.staffId && (
                          <div className="text-danger">{errors.staffId}</div>
                        )} */}
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

                              //   onChange={handleChange}
                              //   value={values.status}
                              //   className={
                              //     errors.status && touched.status ? "invalid" : ""
                              //   }
                            >
                              <option value="">Select status</option>
                              <option value={true}>Active</option>
                              <option value={false}>Inactive</option>
                            </Input>
                            {/* {errors.status && touched.status && (
                          <div className="text-danger">{errors.status}</div>
                        )} */}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row form>
                        <Nav tabs>
                          <NavItem style={{ width: 350 }}>
                            <NavLink
                              className={classnames(
                                { active: activeTab === 0 },
                                "doc-title"
                              )}
                              onClick={() => {
                                toggle(0);
                              }}
                            >
                              Select Appliction Menus{" "}
                              <span className="isRequire">*</span>
                            </NavLink>
                          </NavItem>
                          <NavItem style={{ width: 350 }}>
                            <NavLink
                              className={classnames(
                                { active: activeTab === 1 },
                                "doc-title"
                              )}
                              onClick={() => {
                                toggle(2);
                              }}
                            >
                              Select Segment Items{" "}
                              <span className="isRequire">*</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={0}>
                              <AppTable/>
                        </TabPane>
                          <TabPane tabId={1}>
                              <SegTable/>
                            </TabPane>
                        </TabContent>
                       
                      </Row>
                      <button type="submit" hidden></button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            {/* {personnel.id ? (
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
        )} */}
          </Button>
          {/* {personnel.id ? (
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
      </Button>{" "} */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GroupForm;
