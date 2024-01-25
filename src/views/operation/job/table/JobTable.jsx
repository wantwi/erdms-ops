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
  CommandColumn
} from "@syncfusion/ej2-react-grids";
import { dateTemplate } from "util/helper";

const statusTemplate = ({ status }) => {
  console.log({status});
  return status === "Opened" ? (
    <span
      className="bg-light-green"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "auto",
      }}
    >
    {status}
    </span>
  ) :
  
  status === "Assigned" ? (
    <span
      className="bg-light-purble"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "auto",
       
      }}
    >
    Assigned
    </span>
  ) :
  status === "Closed" ? (
    <span
      className="bg-light-success"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "auto",
       
      }}
    >
     {status}
    </span>
  ) :
  status === "WaitingApproval" ? (
    <span
     className="bg-light-org"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "auto",
       
       
      }}
    >
     Waiting Approval
    </span>
  ) :
  (
    <span
      className="bg-light-danger"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "auto",
        background:'gold',
        color:"white",
        opacity:0.7,
       
      }}
    >
      {status}
    </span>
  );
};

const actionTemp = ()=>{
  return(
    <div ><i className="fa fa-eye"></i></div>
  )
}



const JobTable = ({data, rowSelected}) => {
 

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
        rowSelected={rowSelected}
        dataSource={data}
      >
        <ColumnsDirective>
        <ColumnDirective
            field="id"
            headerText="id"
           visible={false}
            textAlign="left"
          />
          <ColumnDirective
            field="jobNumber"
            headerText="Job Number"
            width="150"
            textAlign="left"
          />
            <ColumnDirective
            field="jobName"
            headerText="Job Name"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="customer.name"
            headerText="Customer"
            width="300"
            textAlign="left"
          />
          <ColumnDirective
            field="financingOption.name"
            headerText="Financing Option"
            width="150"
            textAlign="left"
          />
           <ColumnDirective
            field="status"
            headerText="Status"
            width="150"
            textAlign="left"
            template={statusTemplate}
          />
          
          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
          template={actionTemp}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>

    </div>
  );
};

export default JobTable;
