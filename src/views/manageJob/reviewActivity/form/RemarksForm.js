import React, { useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
  Label,
  FormGroup,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const RemarksForm = (props) => {
  const { isOpen, setIsOpen, handleRemarksSubmit, title } = props;
  const submitBtn = useRef(null);

  let schema = Yup.object().shape({
    remarks: Yup.string().required("Remark is required"),
  });

  return (
    <div>
      <Modal isOpen={isOpen} size="md">
        <ModalHeader
          style={{
            background: "#e0e6ef",
            borderBottom: "1px solid #563c91",
          }}
        >
          <span className="mb-3" style={{ fontWeight: 900 }}>
            {title}
          </span>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ remarks: "" }}
            validationSchema={schema}
            onSubmit={handleRemarksSubmit}
          >
            {({ values, errors, handleChange, touched }) => (
              <Form form>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="remarks">
                        Remarks <span className="isRequire">*</span>
                      </Label>
                      <Input
                        type="textarea"
                        row={4}
                        name="remarks"
                        id="remarks"
                        placeholder="Enter description"
                        onChange={handleChange}
                        value={values.remarks}
                        className={
                          errors.remarks && touched.remarks ? "invalid" : ""
                        }
                      />
                      {errors.remarks && touched.remarks && (
                        <div className="text-danger">{errors.remarks}</div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <input hidden ref={submitBtn} type="submit" value="save" />
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            className="c-primary"
            onClick={() => submitBtn.current.click()}
            type="submit"
          >
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RemarksForm;
