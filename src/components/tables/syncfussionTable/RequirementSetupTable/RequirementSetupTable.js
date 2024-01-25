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


import CustomModal from "../../../modal/CustomModal";
import {useDispatch, useSelector} from "react-redux"


import "../generic.style.css";
import { getSelectedRequirement } from "redux/requirementSetup/actions";
import { getAllRegulatoryOptions } from "redux/regulatoryOption/action";
const actionTemp = ({code})=>{
  return(
    <div><i className="fa fa-eye"></i></div>
  )
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

const renderRequirement = ({id,name, document,code,requirementAction,requirementType,status})=>{
  return {
    id,
    code,
    name,
    documentId:document.id,
    requirementTypeId:requirementType.id,
    requirementAction:requirementAction.id,
    status: status ? "1" :"0"
  }
}

const RequirementSetupTable = ({data,setOpenModal}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch= useDispatch()  

const rowSelected =(args)=>{
   
  dispatch(getSelectedRequirement(renderRequirement(args.data)))
  setOpenModal(true)
}



  const actionBegin = args => {
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };

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
            width="80"
            textAlign="left"
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="150"
            textAlign="left"
          />
          
           <ColumnDirective
            field="requirementType.name"
            headerText="Requirement Type"
            width="150"
            textAlign="left"
          />
         
           <ColumnDirective
            field="document.name"
            headerText="Document"
            width="150"
            textAlign="left"
          />
            <ColumnDirective
            field="requirementAction.name"
            headerText="Status"
            width="80"
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

export default RequirementSetupTable;
