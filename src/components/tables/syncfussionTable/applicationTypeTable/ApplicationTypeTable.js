import React, { useRef, useState } from "react";
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
import {
  Badge
} from "reactstrap";
import "../generic.style.css";
import {useSelector,useDispatch} from "react-redux"
import {getSelectedProcess, getProcess} from "redux/serviceProcess/actions"
import * as FaIcons from 'react-icons/fa'
import { showLoader, hideLoader } from "redux/loader/Loader";
import styled from "styled-components";
import { useGetById } from "hooks/useQueryInfo";
import useCustomApi from "api/useCustomApi";


const renderData =(props)=>{
  console.log({renderData: props})
  const {id,code,name,description,serviceType,status, activities,proccessOwners} = props
 
  return {
    id,
    code,
    name,
    description,
    status: status ? "1" :"0",
    processType:serviceType.id,
    activities,
    processOwner:proccessOwners.map(x => ({id:x.id, name:`${x.firstName} ${x.firstName}`}))

  }
}

const ActionWrap =  styled.div`
display: flex;
justify-content: center;

` 


const ApplicationTypeTable = ({data, setIsClone,setOpenModal}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedRowId, setSelectedRowId] = useState("")
  const customApi = useCustomApi();
  const dispatch = useDispatch()

  const GetById = async () => {
    dispatch(showLoader());
    const response =  await customApi.get(`Services/${selectedRowId}`)

    return response.data

  }

  const onSuccess = (data) => {
    dispatch(getSelectedProcess(renderData(data)))
    dispatch(hideLoader());
     setOpenModal(true);
    
  }

  const onError = (data) => {
    console.log({data})
  }
  const { data:selectedServiceActivity, refetch } = useGetById(
    "activity-types",
    selectedRowId,
    GetById,
    onSuccess,
    onError
  );


  const actionBegin = args => {
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };



  const actionTemplate = ({id,code, name,description, serviceType}) => {
    let data ={id,code, name,description, serviceType}
  
    return (
      <ActionWrap>
       <Badge color='primary'  title="View Process" className='btn btn-sm  mr-2 p-1' style={{width:30,background:"#67abda !important", border:"1px solid #67abda"}} onClick={() => getRowRecordes(data)}>
        <FaIcons.FaEye size={14} className='align-middle me-25' />
      </Badge>

       <Badge title="Clone Process" color='primary' className='btn btn-sm btn-primary p-1' style={{width:30,padding:4}} onClick={() => getCloneRow(data)}>
        <FaIcons.FaClone size={14} className='align-middle me-25' />
      </Badge>
     
      </ActionWrap>
     
    )
  }

  const getCloneRow =(data)=>{

    console.log({getRowRecordes: data})
    
    setIsClone(true);
    
    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);

  }

  const getRowRecordes = (data) =>{
    console.log({getRowRecordes: data})
    
    setIsClone(false);
    
    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);
   
  }



  const commands = [
    {
      type: "Edit",
      buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" }
    },
    {
      type: "Delete",
      buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" }
    },
    {
      type: "Save",
      buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" }
    },
    {
      type: "Cancel",
      buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" }
    }
  ];



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
      >
        <ColumnsDirective>
          <ColumnDirective
            field="code"
            headerText="Code"
            width="100"
            textAlign="left"
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="230"
            textAlign="left"
        
          />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="250"
            textAlign="left"
          />
          <ColumnDirective
            headerText="Action"
            width="160"
            textAlign="center"
            template={actionTemplate}
            // commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>

   
    </div>
  );
};

export default ApplicationTypeTable;
