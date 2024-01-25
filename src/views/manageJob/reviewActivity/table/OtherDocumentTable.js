
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
import React from "react";
import { CustomAxios } from "util/customAxios";
import Moment from 'react-moment';
import * as FaIcons from "react-icons/fa"
import { Button } from "reactstrap";
import useCustomApi from "api/useCustomApi";

const OtherDocumentTable = ({setAddNew, otherDocumnets}) => {
  const customApi = useCustomApi();

    const dateTemplate = ({createdAt})=>{
 
        return (
          <Moment format="MMM DD YYYY" >
             {createdAt}
          </Moment>
      );
      }
    const actionBegin = (arg) => {
        console.log({arg})
        if(arg.requestType === "add"){
            arg.cancel = true
            setAddNew(true)
        }

    }

    const getDoc = (fileReferenceId) => {
        console.log({CustomAxios})
        customApi.defaults.responseType ="blob"
        customApi.get(`download/${fileReferenceId}`)
        .then((data) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data.data);
            link.download = `_${fileReferenceId}.pdf`;
            link.click();
            customApi.defaults.responseType ="json"
           
          }).catch(err =>{
                console.log({err})
          })
       
        }
    const actionTemplate = (row)=>{
        return (<Button onClick={()=>getDoc(row.fileReferenceId)} className="btn btn-sm btn-info">
            <FaIcons.FaDownload/>
        </Button>)

    }
    

    return(
        <GridComponent
     toolbar={[{ text: "Add", align: "right" }]}
        height={300}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
        actionBegin={actionBegin}
        dataSource={otherDocumnets}
       // rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="150"
            textAlign="left"
          />
           <ColumnDirective
            field="description"
            headerText="Description"
            width="250"
            textAlign="left"
         
          />

          <ColumnDirective
            field="createdAt"
            headerText="Date"
            width="100"
            textAlign="left"
            template={dateTemplate}
          />

            <ColumnDirective
            field=""
            headerText="Action"
            width="80"
            textAlign="center"
            template={actionTemplate}
          />
         
          
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>
    )

}

export default OtherDocumentTable