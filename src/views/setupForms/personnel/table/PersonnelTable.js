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



const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};
const renderName =({firstName,lastName})=>{

  return <div>
      {`${firstName} ${lastName}`}
    </div>

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

const PersonnelTable = ({personnels,grid, rowSelected }) => {
  

 

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
        dataSource={personnels}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="staffId"
            headerText="Staff ID"
            width="150"
            textAlign="left"
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="left"
            template={renderName}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="phone"
            headerText="Contact"
            width="100"
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

export default PersonnelTable;
