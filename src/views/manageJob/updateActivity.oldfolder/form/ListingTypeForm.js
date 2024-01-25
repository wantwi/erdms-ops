import React, { useState, useEffect } from "react";
import { Input, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ListingTypeForm = ({
  metata,
  handleSubmit,
  submitBtn,
  requriementName,
  inputFile,
  activityInfo,
  setIsOpen
}) => {
  const { metadata, jobNumber, documentType } = metata;
  const [prev, setPrev] = useState(false)
  const [src, setsrc] = useState()

  const dispatch = useDispatch();
  let init = {};
  metadata.forEach((x) => {
    init[`${x.label}`] = "";
  });
  init.file = "";

  let schemaOpt = {};
  metadata.forEach((x) => {
    schemaOpt[`${x.label}`] =
      x.inputType.toLowerCase === "date"
        ? Yup.date().required(`${x.label} is required`)
        : x.inputType.toLowerCase === "number"
        ? Yup.number().required(`${x.label} is required`)
        : Yup.string().required(`${x.label} is required`);
  });

  schemaOpt.file = Yup.string().required(`Document is required`);

  const schema = Yup.object().shape(schemaOpt);

  const handlePreview =async()=>{

    const img = await  getBase64(inputFile.current.files[0])

    if(img){
      console.log({img});

      setsrc(img)
      setPrev(true)
    }
   
  }

  useEffect(() => {}, [metata]);

  
  return (
    <>
      <Formik
        initialValues={init}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, touched }) => (
          <Form encType="multipart/form-data">
            <div
              style={{
                borderRadius: 10,
                height: "auto",
                background: "#ebebeb",
                padding: "10px",
              }}
            >
              <Row>
                <Col md={5}>
                  <label>
                    Attach Document <span className="isRequire">*</span>
                  </label>
                  <br />
                  <input
                  disabled ={documentType ==="No Document" ? true: false }
                    ref={inputFile}
                    type="file"
                    name="file"
                    onChange={handleChange}
                    value={values.file}
                    className={errors.file && touched.file ? "invalid" : ""}
                  />
                  {errors.file && touched.file && (
                    <div className="text-danger">{errors.file}</div>
                  )}
                
                </Col>
                <Col md={7}>
                  <div
                    style={{
                      background: "#e1e2e3",
                      padding: "10px 20px",
                      borderRadius: 10,
                    }}
                  >
                    <label className="mr-1">Job Number : </label>
                    <span>{jobNumber}</span>
                    <br />
                    <label className="mr-1">Requirement : </label>
                    <span>{requriementName}</span>
                    <br />
                    <label className="mr-1">Document Type :</label>
                    <span>{documentType}</span>
                    <br />
                  </div>
                </Col>
              </Row>
            </div>

            {metadata.map((x, i) => {
              const { inputType, isRequired, label: lb } = x;

              return (
                <>
                  <Row key={i} className="mt-2" form>
                    <Col md={5}>
                      <label>
                        {lb}{" "}
                        {isRequired ? (
                          <span className="isRequire">*</span>
                        ) : null}
                      </label>
                    </Col>
                    <Col md={7}>
                      <Input
                        name={lb}
                        type={`${inputType.toLowerCase()}`}
                        placeholder="Enter data"
                        onChange={handleChange}
                        value={values[`${lb}`]}
                        className={
                          errors[`${lb}`] && touched[`${lb}`] ? "invalid" : ""
                        }
                      />
                      {errors[`${lb}`] && touched[`${lb}`] && (
                        <div className="text-danger">{errors[`${lb}`]}</div>
                      )}
                    </Col>
                  </Row>
                </>
              );
            })}

            <button hidden ref={submitBtn} type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
      <Modal
      isOpen={prev}
      size="xl"
      
      >
         <ModalHeader>
          <span className="mb-3" style={{ fontWeight: 900 }}>
         Preview Document
          </span>
        </ModalHeader>
        <ModalBody>

          <img data={src} style={{minHeight:500}} type="application/docx" />

         

        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setPrev(false)}>
            Close
          </Button>
         
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ListingTypeForm;
