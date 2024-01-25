import React, { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Inject,
  Toolbar,
  Group,
  Edit,
  CommandColumn
} from "@syncfusion/ej2-react-grids";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
//import classnames from "classnames";
import CustomModal from "../../../modal/CustomModal";
//import ActivityTable from "../../../../views/setupForms/applicationType/table/ActivityTable";
import "../generic.style.css";
import {useDispatch, useSelector } from "react-redux"
import { getSelectedDocument } from "redux/documentSetup/actions";



const renderData = ({code,description,documentType,id,name,status})=>{



return {id,code, name, description, docType: documentType.id, status: status ? "1" :"0" }
}

const statusTemplate = ({ status }) => {
  return status === true ? (
      <span className="bg-light-success"  style={{textAlign:"left",borderRadius:'5px', margin:0, padding:"5px 10px",width:"100px"}}>
          Active
      </span>
  ) : (
      <span className="bg-light-danger"  style={{textAlign:"left",borderRadius:'5px', margin:0, padding:"5px 10px",width:"100px"}} >Inactive</span>
  )
}

const actionTemp = ({code})=>{
  return(
    <div ><i className="fa fa-eye"></i></div>
  )
}



const DocumentSetupTable = ({data,setOpenModal}) => {
  const [showModal, setShowModal] = useState(false);
 const dispatch = useDispatch()


  const actionBegin = args => {
   
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };

  const rowSelected =(args)=>{
   
    dispatch(getSelectedDocument(renderData(args.data)))

    setOpenModal(true)
  }

 

  // const commands = [
  //   {
  //     type: "preview",
  //     buttonOption: { iconCss: " e-icons e-eye", cssClass: "e-flat" }
  //   },
  //   // {
  //   //   type: "Delete",
  //   //   buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" }
  //   // },
  //   // {
  //   //   type: "Save",
  //   //   buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" }
  //   // },
  //   // {
  //   //   type: "Cancel",
  //   //   buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" }
  //   // }
  // ];

  return (
    <div className="mt-2">
      <GridComponent
      pageSettings={{ pageCount: 4, pageSizes: true }}
        height={600}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top"
        }}
        actionBegin={actionBegin}
        dataSource={data}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="code"
            headerText="Code"
            width="100"
            textAlign="left"
          />
           <ColumnDirective
            field="name"
            headerText="Document Name"
            width="200"
            textAlign="left"
          />
           <ColumnDirective
            field="documentTypeName"
            headerText="Document Type"
            width="160"
            textAlign="left"
          
          />
           <ColumnDirective
            field="status"
            headerText="Status"
            width="80"
            textAlign="left"
            template={statusTemplate}
            customAttributes= { {class: 'ml--3' }}
          />
          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
            template={actionTemp}
            // commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>

      <CustomModal
        setShowModal={setShowModal}
        showModal={showModal}
        title="Add Document"
      >
        <Row>
          <Col sm="12">
            <div className="doc-title mt-10">
              <Form>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="processCode">Name</Label>
                      <Input
                        type="text"
                        name="code"
                        id="processCode"
                        placeholder="Enter name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="processDescription">Description</Label>
                  <Input
                    type="description"
                    name="description"
                    id="processDescription"
                    placeholder="Enter description"
                  />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="processType">Document Type</Label>
                      <Input type="select" name="process Type" id="processType">
                        <option value="-1">Select document type</option>
                        <option value="0">Certificate</option>
                        <option value="1">Letter</option>
                        <option value="2">Agreement Form</option>
                        <option value="3">Memo</option>
                        <option value="4">Report</option>
                        <option value="5">Transfer Advice</option>
                        <option value="6">Invoice</option>
                        <option value="7">Payment Advice</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="processStatus">Status</Label>
                      <Input type="select" name="status" id="processStatus">
                        <option value="-1">Select status</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
        {/* <h1>Forms goes here</h1> */}
      </CustomModal>
    </div>
  );
};

export default DocumentSetupTable;
