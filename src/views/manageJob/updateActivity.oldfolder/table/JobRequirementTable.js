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
import MetadataModal from "../modal/MetadataModal"
import ListingTypeForm from "../form/ListingTypeForm"
import Moment from 'react-moment';


const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};

 const dateTemplate = ({date})=>{
 
  return (
    <Moment format="MMM DD YYYY" withTitle>
       {date}
    </Moment>
);
}

const statusTemplate = ({ status }) => {
  return status === "Uploaded" ? (
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
      {status}
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

const JobRequirementTable = ({isOpen, setIsOpen,inputFile,handleSubmit,activityRequirement, submitBtn,requriementName,  activityInfo }) => {
 
  // const dispatch = useDispatch();

  const [metata] = useState([])
  
  const actionBegin = (args) => {
    if (args.requestType === "add") {
      args.cancel = true;
      // setShowModal(!showModal);
    }
  };

 

  return (
    <div className="mt-2">
      <GridComponent
        // toolbar={[{ text: "Add", align: "right" }]}
        height={300}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
        actionBegin={actionBegin}
        dataSource={activityRequirement}
        // rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="requirementName"
            headerText="Requirement"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="updatedAt"
            headerText="Date"
            width="100"
            textAlign="left"
            template={dateTemplate}
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

<MetadataModal

isOpen={isOpen}
 setIsOpen={setIsOpen}
 submitBtn={submitBtn}


>
<ListingTypeForm activityInfo={activityInfo} setIsOpen={setIsOpen} inputFile={inputFile} requriementName={requriementName.requirementName} submitBtn={submitBtn} handleSubmit={handleSubmit} metata ={metata} />

</MetadataModal>
    </div>
  );
};

export default JobRequirementTable;
