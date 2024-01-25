import React, { useState, useRef } from "react";
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
import { DataManager, Query } from '@syncfusion/ej2-data';
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useSelector } from "react-redux";
import RequirementModalForm from "../modal/RequirementModalForm";

import {queryCache} from "react-query"
import { useGet } from "hooks/useQueryInfo";
import useCustomApi from "api/useCustomApi";

const commands = [
 
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" }
  },
 
];

let actitites = [
  {
    name: "Application Form"
  },
  {
    name: "Building Permit"
  },
  {
    name: "Business Plan"
  },
  {
    name: "Certificate To Commence Business"
  },
  {
    name: "Geological Survey"
  },
  {
    name: "Land Title Registration/Lease Agreement"
  },
  {
    name: "Geotechnical Report"
  }
];

let dropdownObjr;
let elem;
const dropdownTemp = {
  create: () => {
    //create function is used to create the element at time of initialization
    elem = document.createElement("input");
    return elem;
  },

  destroy: () => {
    //destroy function is used to destroy the component.
    dropdownObjr.destroy();
  },
  read: () => {
    //read function is used to read the value from component at time of save.
    return dropdownObjr.value;
  },
  write: args => {
    dropdownObjr = new DropDownList({
      //Custom DropDownList component
      dataSource: new DataManager(actitites),
      fields: { text: "name", value: "name" },
      value: args.rowData[args.column.field],
      actionComplete: () => false,
      allowFiltering: true,
      popupHeight: "300px"
    });
    dropdownObjr.appendTo(elem);

    //	write function is used to create custom component or assign default value at time of editing.
  }
};

const ActivityTable = ({setRequirements,activityGrid, requirementData}) => {
  const customApi = useCustomApi();
  const [show, setShow] = useState(false)
  const requirementVal = useRef("");

  const addToGridBtn =  useRef()

  const handleClickEvent =()=>{
    setShow(false)
    addToGridBtn.current.click()
   }

  const actionBegin =(args)=>{
    if(args.requestType === 'add'){
      args.cancel = true

      setShow(true)
     
    }
  }

  const actionComplete =(args)=>{
 
    if(args.requestType === 'save'){
      setRequirements(activityGrid.current.currentViewData)
    }
  
  }
  
  
  return (
    <div className="p-4">
      {" "}
      <GridComponent
        ref={activityGrid}
        toolbar={[{ text: "Add" }]}
       
        height={250}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top"
        }}
        actionBegin={actionBegin}
        actionComplete={actionComplete}
       
        dataSource={requirementData}
      >
        <ColumnsDirective>
        <ColumnDirective
            field="id"
            headerText="ID"
            width="300"
            textAlign="left"
            visible={false}
          
          
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


      <RequirementModalForm addToGridBtn={addToGridBtn} setRequirements={setRequirements} requirementVal={requirementVal} handleClickEvent={handleClickEvent}  showModal ={show} setShowModal={setShow} title = "Add Requirement"/>
    </div>
  );
};

export default ActivityTable;
