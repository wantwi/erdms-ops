import React, { useRef } from "react";
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
import Moment from "react-moment";


 const dateTemplate = ({jobDate})=>{
 
  return (
    <Moment format="MMM DD YYYY" withTitle>
       {jobDate}
    </Moment>
);
}

const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};

const statusTemplate = ({ status }) => {
  console.log({status});
  return status === "InProgress" ? (
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
     In Progress
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
  status === "Completed" ? (
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

const UpdateActivityTable = ({ activities, rowSelected }) => {
  // const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const grid =useRef(null)

 

  const actionBegin = (args) => {
    if (args.requestType === "add") {
      args.cancel = true;
     
    }
  };

  // const groupOptions ={
  //   showGroupedColumn: false, columns: ['Customer'] 
  // }
  // const dataBound =()=>{

  //   grid.current.gridInstance.groupColumn('Customer');

  // }


  return (
    <div className="mt-2">
    <GridComponent
    
    ref={grid}
      height={600}
      allowPaging={true}
      allowGrouping={true}
      // groupSettings={{ columns: ['Customer']}}
      editSettings={{
        allowEditing: false,
        allowAdding: true,
        allowDeleting: true,
        newRowPosition: "Top",
      }}
      actionBegin={actionBegin}
      dataSource={activities}
      rowSelected={rowSelected}
     
    >
      <ColumnsDirective>
      <ColumnDirective
          field="jobNumber"
          headerText="Job Number"
          width="140"
          textAlign="left"
        />
      <ColumnDirective
          field="sequence"
          headerText="Seq#"
          width="70"
          textAlign="left"
        />
     
         <ColumnDirective
          field="customerName"
          headerText="Customer"
          width="300"
          textAlign="left"
        />
        <ColumnDirective
        
        field="serviceName"
        headerText="Service"
        width="200"
        textAlign="left"
      />
       
        <ColumnDirective
          field="activityName"
          headerText="Activity"
          width="300"
          textAlign="left"
        />
        <ColumnDirective
          field="jobDate"
          headerText="Date"
          width="80"
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
      
        ></ColumnDirective>
      </ColumnsDirective>
      <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
    </GridComponent>
  </div>
  );
};

export default UpdateActivityTable;
