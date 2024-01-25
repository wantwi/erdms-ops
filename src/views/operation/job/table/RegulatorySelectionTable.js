import React, {  useRef } from "react";
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
import { Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter} from "reactstrap"
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useSelector } from "react-redux";

  const RegulatorySelectionTable = ({handleAddEvent,myGrid, showTable, setShowTable,data,title}) => {
    
  
  return (
    <div className="p-4">
       <Modal
        isOpen={showTable}
        size="lg"
      >
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>{title}</span>

        </ModalHeader>
        <ModalBody>
      <GridComponent
        ref={myGrid}
        height={400}
        allowPaging={false}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
     
        dataSource={data}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="id"
            headerText="ID"
            visible={false}
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="300"
            textAlign="left"
          />

        
        <ColumnDirective type='checkbox' width='60'></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>
      </ModalBody>
        <ModalFooter>
        <Button
            className="c-secondary"
            size="sm"
            onClick={()=>setShowTable(false)}
          >
            Cancel
          </Button>
          <Button
            className="c-primary"
          size="sm"
           onClick={handleAddEvent}
           
          >
            Add
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
     {/* <h5>items Selected count</h5> */}
     {/* <button ref={addToGridBtn} hidden  onClick={getSelected}>Get Selected</button> */}
    </div>
  );
};

export default RegulatorySelectionTable;
