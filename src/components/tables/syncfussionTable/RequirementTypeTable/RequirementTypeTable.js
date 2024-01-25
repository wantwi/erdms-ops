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
//import ActivityTable from "../../../../views/setupForms/requirementSetup/table/ActivityTable";
import "../generic.style.css";
const data = [
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  },
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  },
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  },
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  },
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  },
  {
    code: 1010,
    name: "Acquire EPA Permit",
    description: "Process Discription"
  }
];

const RequirementTypeTable = () => {
  const [showModal, setShowModal] = useState(false);
  //const [activeTab, setActiveTab] = useState("1");
  // const toggle = tab => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //   }
  // };

  const actionBegin = args => {
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };

  const commands = [
    {
      type: "Edit",
      buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" }
    },
    {
      type: "Delete",
      buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" }
    },
    {
      type: "Save",
      buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" }
    },
    {
      type: "Cancel",
      buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" }
    }
  ];

  return (
    <div className="mt-2">
      <GridComponent
        toolbar={[{ text: "Add", align: "right" }]}
        height={400}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top"
        }}
        actionBegin={actionBegin}
        dataSource={data}
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
            headerText="Name"
            width="300"
            textAlign="left"
          />
          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
            commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>

      <CustomModal
        setShowModal={setShowModal}
        showModal={showModal}
        title={"Requirement Type"}
      >
        <Row>
          <Col sm="12">
            <div className="doc-title mt-10">
              <Form>
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Label for="processCode">Code</Label>
                      <Input
                        type="text"
                        name="code"
                        id="processCode"
                        placeholder="Enter code"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={7}>
                    <FormGroup>
                      <Label for="processName">Name</Label>
                      <Input
                        type="text"
                        name="Name"
                        id="processCode"
                        placeholder="Enter name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="processDescription">Description</Label>
                      <Input
                        type="description"
                        name="description"
                        id="processDescription"
                        placeholder="Enter description"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={5}>
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
      </CustomModal>
    </div>
  );
};

export default RequirementTypeTable;
