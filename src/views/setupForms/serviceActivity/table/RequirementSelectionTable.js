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
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useSelector } from "react-redux";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
// import RequirementModalForm from "../modal/RequirementModalForm";



const RequirementSelectionTable = ({setShowModal,setRequirements, addToGridBtn}) => {
  // const [show, setShow] = useState(false);
  // const requirementVal = useRef("");
    const myGrid =  useRef()
    const customApi = useCustomApi();
  
  // const { requirements } = useSelector((state) => state.requirementSetup);

  // console.log({requirements})

  const GetAllDefaultRequirements = async () => {
    let url = `/Requirements/Default?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const { data: defaultrequirements } = useGet(
    "default-requirements",
    GetAllDefaultRequirements,
    "",
    (data)=>{},
    (data)=>{},
  );
  const getSelected =()=>{
   
    setRequirements((prev)=>[...prev,...myGrid.current.getSelectedRecords()].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setShowModal(false);
  }



  return (
    <div className="p-4">
      {" "}
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
     
        dataSource={defaultrequirements}
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
     {/* <h5>items Selected count</h5> */}
     <button ref={addToGridBtn} hidden  onClick={getSelected}>Get Selected</button>
    </div>
  );
};

export default RequirementSelectionTable;
