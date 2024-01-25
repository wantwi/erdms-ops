import React,{useEffect,useState} from "react";
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
import { Application } from "util/sample";
import { Badge } from 'reactstrap'
// ** Icons Imports
import { PlusCircle } from 'react-feather'
import AppMenuTree from "../tree/AppMenuTree";



const AppTable = () => {
  const [apps, setApps] = useState([])
  const [show, setShow] =  useState(false)
  const [info, setInfo] = useState({})

  const getAppMenus = (id, name) => {
    console.log({name});
    
    setInfo({id, name})
    setShow(true)

   
  }

  console.log({info});

  const actionTemplate = ({id, name}) => {
  
    return (
      <Badge color='primary' className='btn btn-sm btn-primary p-2' onClick={() => getAppMenus(id, name)}>
        <PlusCircle size={12} className='align-middle me-25' />
     
      <span className='align-middle ms-25'>Add</span>
    </Badge>
    )
  }

  const getApps = () => {
    setApps(Application.map(x => ({id:x.id, name:x.name})))
   }
 
   useEffect(() => {
     
     getApps()
   
    
   }, [])

  return (
    <div>
     <GridComponent
        height={250}
        allowPaging={false}
        dataSource={apps}
      >
        <ColumnsDirective>
        <ColumnDirective field='id' headerText='ID'  visible={false} textAlign='left'></ColumnDirective>
          <ColumnDirective field='name' headerText='Application Name'  textAlign='left'></ColumnDirective>
          <ColumnDirective
            headerText=""
            width="150"
            textAlign="left"
            template={actionTemplate}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit]} />
      </GridComponent>
      <AppMenuTree show={show} info ={info} setShow={setShow}/>
    </div>
  );
};

export default AppTable;
