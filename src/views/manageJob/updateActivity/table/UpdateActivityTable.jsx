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
  ColumnChooser,
  Freeze
} from "@syncfusion/ej2-react-grids";
import { useDispatch } from "react-redux";
import { getJob } from "redux/assignactivity/action";
import Moment from "react-moment";
import { useGet } from "hooks/useQueryInfo";
import { GetAssignedActivityEndpoint } from "api/apiEndPoint";
import Skeleton from "react-loading-skeleton";


 const dateTemplate = ({jobDate})=>{
 
  return (
    <Moment format="MMM DD YYYY" withTitle>
       {jobDate}
    </Moment>
);
}

const officerTemplate = ({officer}) =>{
  console.log({officer})
  if(!officer){
    return "Not assigned"
  }
  const {firstName,lastName} = officer

  return (<div>{firstName} {lastName}</div>);
}


const actionTemp = ({ code }) => {
  return (
    <div onClick={console.log({ code })}>
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

const UpdateActivityTable = ({  rowSelected }) => {
  // const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const grid =useRef(null)

 

  const actionBegin = (args) => {
    if (args.requestType === "add") {
      args.cancel = true;
     
    }
  };

  const groupOptions ={
    showGroupedColumn: false, columns: ['Customer'] 
  }
  // const dataBound =()=>{

  //   grid.current.gridInstance.groupColumn('Customer');

  // }

  const {data:activities, isLoading} = useGet("activities",GetAssignedActivityEndpoint)

  console.log({activities});

  return (
    <div className="mt-2">
      {
        isLoading ?  <Skeleton  baseColor="#e1e2e3" style={{height:'350px', width:'100%'}}/>:
        <GridComponent
  
        // toolbar={["ColumnChooser"]}
        ref={grid}
          height={600}
          allowPaging={true}
          allowGrouping={true}
          groupSettings={{ columns: ['jobNumber']}}
          editSettings={{
            allowEditing: false,
            allowAdding: true,
            allowDeleting: true,
            newRowPosition: "Top",
          }}
          actionBegin={actionBegin}
          dataSource={activities}
          rowSelected={rowSelected}
          showColumnChooser={true} 
          // frozenColumns={1}
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
              width="200"
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
              width="130"
              textAlign="left"
            />
             <ColumnDirective
          field="officer.firstName"
          headerText="Officer"
          width="150"
          textAlign="left"
          template={officerTemplate}
        />
            <ColumnDirective
              field="jobDate"
              headerText="Date"
              width="100"
              textAlign="left"
              template={dateTemplate}
            />
    
            <ColumnDirective
              field="status"
              headerText="Status"
              width="90"
              textAlign="left"
              template={statusTemplate}
            />
    
            <ColumnDirective
              headerText="Action"
              width="70"
              textAlign="center"
              template={actionTemp}
          
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, CommandColumn,ColumnChooser,Freeze, Toolbar, Edit, Group]} />
        </GridComponent>

      }
   
  </div>
  );
};

export default UpdateActivityTable;
