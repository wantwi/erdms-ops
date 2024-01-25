import React, { useState } from "react";
import {
  
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
} from "reactstrap";
import { FileUploader } from "react-drag-drop-files";
import OtherDocumentTable from "views/manageJob/reviewActivity/table/OtherDocumentTable";
// import { CustomAxios } from "util/customAxios";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { useDispatch } from "react-redux";
// import { date } from "yup";
import useCustomApi from "api/useCustomApi";


const OtherDocumnetForm = (props) => {

  const { setShow, show, otherDocumnets, activityInfo,setOtherDocumnets } = props;
  const dispatch = useDispatch()
  const [file, setFile] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [fileName, setFileName] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const customApi = useCustomApi();
  const handleChange = (file) => {
    setFile(file);
    setFileName(file[0].name)
  };

  const fileTypes = ["PDF"];

  const handleSubmit =  () => {
    dispatch(showLoader())

    let fd = new FormData();
    fd.append("file", file[0]);
   
    customApi.post(`upload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(result =>{
        postData(result)
      }).catch(error =>{
        dispatch(setResponse(error?.response?.data?.errors[0]?.message || "Sorry, something went wrong", false));
        dispatch(hideLoader())
        dispatch(setResponse("", true));

      })
   
    // 
  };

  const postData = async (data) =>{
  
    try {
        let obj = {};

        obj.name = name
        obj.description = description
        obj.fileReferenceId = data.data.fileId
        obj.jobActivityId= activityInfo?.id
        const response = await customApi.post("Job/OtherJobDocuments",obj)
        console.log({response})

      
        setOtherDocumnets((prev) => ([...prev, {name, description,fileReferenceId:  data.data.fileId, createdAt: Date.now()}]))
        setName("")
        setFile(null)
        setDescription("")

        dispatch(hideLoader())
        setAddNew(false)

    } catch (error) {
        dispatch(hideLoader())

    }
  }

 console.log({name, fileName})
  return (
    <div>
      <Modal isOpen={show} size="lg">
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span className="mb-3" style={{ fontWeight: 900 }}>
            {addNew? "Add New " :"Other"} Document
          </span>
        </ModalHeader>
        <ModalBody>
          {addNew ? (<>
       
       <Row>
         <Col md={4}>
           <label>Name:</label>
         </Col>
         <Col md={8}>
           <Input type="text" name="name" value={name}  onChange ={(e)=> {setName(e.target.value)}} />
         </Col>
       </Row>
       <br />
       <Row>
         <Col md={4}>
           <label>Description:</label>
         </Col>
         <Col md={8}>
           <Input
           name="name" value={description}  onChange ={(e)=> setDescription(e.target.value)}
         type="textarea" />
         </Col>
       </Row>
       <br />
       <Row>
         <Col md={4}>
           <label>Upload Documnet:</label>
         </Col>
         <Col md={8}>
           <FileUploader
             multiple={true}
             handleChange={handleChange}
             name="file"
             types={fileTypes}
           />
           <p>
               {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
             </p>
         </Col>
       </Row>
     </>) : (
            <div className="p-2">
              <OtherDocumentTable otherDocumnets={otherDocumnets} setAddNew={setAddNew} />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="c-secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>

          

          {addNew ? (
            <>
            <Button
            className="c-danger"
            onClick={() => {
              setAddNew(false);
            }}
          >
            Cancel
          </Button>
            <Button  className="c-primary" onClick={handleSubmit}>
              Submit
            </Button>
            </>
          ) : (
           null
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OtherDocumnetForm;
