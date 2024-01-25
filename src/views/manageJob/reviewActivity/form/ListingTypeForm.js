import React, { useState, useEffect } from "react";


import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
  CardBody,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,Input, Col, Row} from "reactstrap";
import { dateTemplate } from "util/helper";
import LoadingOverlay from 'react-loading-overlay';
import useAuth from "hooks/useAuth";
import classnames from "classnames";
import useCustomApi from "api/useCustomApi";


const { REACT_APP_SERVICE_URL } = process.env;

const sessionData = JSON.parse(sessionStorage.getItem("oidc.user:https://demo.persol-apps.com/lms.auth:lms-operation-host_client"));

// function dataURLtoFile(dataurl, filename) {
//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);

//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mime });
// }

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

const ListingTypeForm = ({
  metata,
  handleSubmit,
  submitBtn,
  requriementName,
  inputFile,
  setIsOpen,
  fileReferenceId,
  activityInfo, 
  prevMetaData
}) => {
  // const { metadata, jobNumber, documentType } = metata;
  const [prev, setPrev] = useState(false);
  const [src, setsrc] = useState();
  const [loading, setloading] = useState(false)
  const {auth} = useAuth()
  const [activeTab, setActiveTab] = useState(1);
  const customApi = useCustomApi();

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  console.log({activityInfo})

  const dispatch = useDispatch();
  let init = {};

  // metadata.forEach((x) => {
  //   init[`${x.label}`] = "";
  // });
  init.file = "";

  let schemaOpt = {};
  // metadata.forEach((x) => {
  //   schemaOpt[`${x.label}`] =
  //     x.inputType.toLowerCase === "date"
  //       ? Yup.date().required(`${x.label} is required`)
  //       : x.inputType.toLowerCase === "number"
  //       ? Yup.number().required(`${x.label} is required`)
  //       : Yup.string().required(`${x.label} is required`);
  // });

  schemaOpt.file = Yup.string().required(`Document is required`);

  const schema = Yup.object().shape(schemaOpt);

  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  const getDoc = (fileReferenceId, documentType) => {
    console.log({})
    customApi.defaults.responseType ="blob"
    customApi.get(`download/${fileReferenceId}`)
    .then((data) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data.data);
        link.download = `${activityInfo?.customerName}_${documentType}.pdf`;
        link.click();
        // setloading(false)
      }).catch(err =>{
            console.log({err})
            // setloading(false)
      })
      customApi.defaults.responseType ="json"
    }
console.log({prevMetaData})
  // const getDoc = (fileReferenceId, documentType) => {
  //   setloading(true)
  //   fetch(`${REACT_APP_SERVICE_URL}download/${fileReferenceId}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${auth?.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.blob())
  //     .then((data) => {
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(data);
  //       link.download = `${activityInfo?.customerName}_${documentType}.pdf`;
  //       link.click();
  //       setloading(false)
  //     }).catch(err =>{
  //       setloading(false)
  //     })
  // };

  const FormDetails = (prop) =>{


    const {
      documentType,
      fileReferenceId,
      id,
      jobActivityName,
      metadata,
    } = prop.prop;

  
    return(
      <Card>
      <CardBody>
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

              <Button
                disabled={documentType === "No Document" ? true : false}
                type="button"
                onClick={() => getDoc(fileReferenceId, documentType)}
                className="c-info mt-2"
                style={{ width: "100%" }}
              >
                Download
              </Button>
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
                <span>{activityInfo?.jobNumber}</span>
                <br />
                <label className="mr-1">Requirement : </label>
                <span>{jobActivityName}</span>
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
                  {inputType === "Date" ? (
                    <div style={style}>{dateTemplate(x.value)}</div>
                  ) : (
                    <Input
                      disabled
                      name={lb}
                      type={
                        inputType === "Date" ? "text" : `${inputType}`
                      }
                      placeholder="Enter data"
                      value={x.value}
                    />
                  )}
                </Col>
              </Row>
            </>
          );
        })}
      </CardBody>
    </Card>
    )

  }


  const TabView = () => {
    return (
      <>
        <Nav tabs>
          {prevMetaData.map((x, i) => (
            <NavItem key={`Nav_${i}`}>
              <NavLink
              style={{background: activeTab === i + 1?"#bcc9dd" :"#fff", color: "black"}}
                className={classnames(
                  { active: activeTab === i + 1 },
                  "doc-title"
                )}
                onClick={() => toggle( i + 1)}
              >
                Document {i + 1}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
        {
          prevMetaData.map((x,i) =><TabPane tabId={i+1}> <FormDetails prop = {x}/>  </TabPane>)
        }
        </TabContent>
      </>
    );
  };

  return (
    <LoadingOverlay
    active={loading}
    spinner={true}
  
  >

    <TabView/>
    {/* <>
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

                  <Button
                    disabled={documentType === "No Document" ? true : false}
                    type="button"
                    onClick={() => getDoc()}
                    className="c-info mt-2"
                    style={{ width: "100%" }}
                  >
                    Download
                  </Button>
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
                    <span>{activityInfo?.jobNumber}</span>
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
                      {
                        inputType === "Date" ? <div style={style}>{dateTemplate(x.value)}</div>  :
                        <Input
                        disabled
                        name={lb}
                        type={
                          inputType === "Date"
                            ? "text"
                            : `${inputType.toLowerCase()}`
                        }
                        placeholder="Enter data"
                        onChange={handleChange}
                        value={x.value}
                        className={
                          errors[`${lb}`] && touched[`${lb}`] ? "invalid" : ""
                        }
                      />
                      }
                      
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
      <Modal isOpen={prev} size="xl">
        <ModalHeader>
          <span className="mb-3" style={{ fontWeight: 900 }}>
            Preview Document
          </span>
        </ModalHeader>
        <ModalBody>
          <iframe data={src} style={{ minHeight: 500 }} />
        </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setPrev(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </> */}
    </LoadingOverlay>
  );
};

export default ListingTypeForm;


const style ={
  border: "1px solid rgb(209, 210, 211)",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "5px",
    background: "#e9ecef",
    border:"1px solid #d1d2d3",
    color: "#495057"
}