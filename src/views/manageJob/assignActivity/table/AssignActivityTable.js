import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Inject,
  Toolbar,
  Group,
  Edit,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { useDispatch } from "react-redux";

const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};

const statusTemplate = ({ status }) => {
  return status === "Opened" ? (
    <span
      className="bg-light-purble"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "100px",
      }}
    >
      Open
    </span>
  ) : status === "Closed" ? (
    <span
      className="bg-light-success"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "100px",
      }}
    >
      Closed
    </span>
  ) : (
    <span
      className="bg-light-danger"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "100px",
      }}
    >
      {status}
    </span>
  );
};

const AssignActivityTable = ({ data, rowSelected }) => {
  const dispatch = useDispatch();

  const actionBegin = (args) => {
    if (args.requestType === "add") {
      args.cancel = true;
    }
  };

  return (
    <div className="mt-2">
      <GridComponent
        height={600}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
        actionBegin={actionBegin}
        dataSource={data}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="jobNumber"
            headerText="Job Number"
            width="100"
            textAlign="left"
          />
          <ColumnDirective
            field="customer.name"
            headerText="Customer"
            width="250"
            textAlign="left"
          />
          <ColumnDirective
            field="jobName"
            headerText="Service"
            width="200"
            textAlign="left"
          />

          <ColumnDirective
            field="status"
            headerText="Status"
            width="100"
            textAlign="left"
            template={statusTemplate}
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
    </div>
  );
};

export default AssignActivityTable;
