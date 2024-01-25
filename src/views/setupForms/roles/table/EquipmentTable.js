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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";



const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};

const statusTemplate = ({ status }) => {
  return status === 1 ? (
      <span className="bg-light-success"  style={{textAlign:"left",borderRadius:'5px', margin:0, padding:"5px 10px",width:"100px"}}>
          Active
      </span>
  ) : (
      <span className="bg-light-danger"  style={{textAlign:"left",borderRadius:'5px', margin:0, padding:"5px 10px",width:"100px"}} >Inactive</span>
  )
}


const EquipmentTypeTable = ({equipments, setOpenModal,grid, rowSelected }) => {
  
  console.log({equipments});

 

  return (
    <div className="mt-2">
      <GridComponent
      ref={grid}
        pageSettings={{ pageCount: 4, pageSizes: true }}
        height={600}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
        dataSource={equipments}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="code"
            headerText="Code"
            width="150"
            textAlign="left"
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="left"
           
          />
          <ColumnDirective
            field="description"
            headerText="Description"
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
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>
    </div>
  );
};




export default EquipmentTypeTable