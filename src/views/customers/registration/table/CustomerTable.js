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
import { useDispatch } from "react-redux";
import { setCustomer } from "redux/customer/actions";
import { useGetById } from "hooks/useQueryInfo";
import { hideLoader, showLoader } from "redux/loader/Loader";
import useCustomApi from "api/useCustomApi";


// const taxExempt =({taxExempt})=>{
//   console.log({taxExempt})
//  // return taxExempt? 'Yes' : "No"
// }

const actionTemp = ({ code }) => {
  return (
    <div >
      <i className="fa fa-eye"></i>
    </div>
  );
};

const taxExemptTemp = ({ taxExempt }) => {
  return (

    <div>
      {
        taxExempt ? 'Yes' : 'No'
      }
    </div>
  );
};




const CustomerTable = ({data, setOpenModal }) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("")
  const customApi = useCustomApi();

  const GetById = async () => {
    dispatch(showLoader());
    const response =  await customApi.get(`Customers/${selectedRowId}`)

    


    return response.data

  }

  const onSuccess = (data) => {
   dispatch(setCustomer(data))
    dispatch(hideLoader());
     setOpenModal(true);
    
  }

  const onError = (data) => {
    console.log({data})
  }
  const { data:selectedCustomer, refetch } = useGetById(
    "activity-types",
    selectedRowId,
    GetById,
    onSuccess,
    onError
  );


  const rowSelected = ({data}) => {
    console.log({getRowRecordes: data})
    
   
    
    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);
    // dispatch(getCustomer(args.data));

    //setTimeout(() => setOpenModal(true), 2500)
  };



  const actionBegin = args => {
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };

  // const commands = [
  //   {
  //     type: "Edit",
  //     buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" }
  //   },
  //   {
  //     type: "Delete",
  //     buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" }
  //   },
  //   {
  //     type: "Save",
  //     buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" }
  //   },
  //   {
  //     type: "Cancel",
  //     buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" }
  //   }
  // ];

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
            field="name"
            headerText="Company Name"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="industry.name"
            headerText="Industry"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="taxExempt"
            headerText="Tax Exempt"
            width="200"
            textAlign="left"
            template={taxExemptTemp}
          />
          <ColumnDirective
            field="phone"
            headerText="Contact"
            width="100"
            textAlign="left"
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


    </div>
  );
};




export default CustomerTable