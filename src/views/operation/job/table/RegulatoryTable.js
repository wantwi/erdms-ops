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
  DetailRow,
} from "@syncfusion/ej2-react-grids";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useSelector } from "react-redux";
import RegulatoryRequirement from "./RegulatoryRequirement";
import RegulatoryForm from "../forms/RegulatoryForm";
import { MdOutlineSignalCellularNull } from "react-icons/md";

const commands = [
  // {
  //   type: "Edit",
  //   buttonOption: { iconCss: "e-icons e-edit", cssClass: "e-flat" }
  // },
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
];

let actitites = [
  {
    name: "Application Form",
  },
  {
    name: "Building Permit",
  },
  {
    name: "Business Plan",
  },
  {
    name: "Certificate To Commence Business",
  },
  {
    name: "Geological Survey",
  },
  {
    name: "Land Title Registration/Lease Agreement",
  },
  {
    name: "Geotechnical Report",
  },
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
  write: (args) => {
    dropdownObjr = new DropDownList({
      //Custom DropDownList component
      dataSource: new DataManager(actitites),
      fields: { text: "name", value: "name" },
      value: args.rowData[args.column.field],
      actionComplete: () => false,
      allowFiltering: true,
      popupHeight: "300px",
    });
    dropdownObjr.appendTo(elem);

    //	write function is used to create custom component or assign default value at time of editing.
  },
};
const actionTemp = () => {
  return (
    <div>
      <i className="fa fa-eye"></i>
    </div>
  );
};

//setServices={setServices} services={services}
const RegulatoryTable = ({
  regTableRef,
  selectedService,
  regulatoryOption,
  setRegulatoryOption,
  setJobRegulatoryOpt,
  data,
}) => {
  const [rowSelected, setRowSelected] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const requirementVal = useRef("");

  console.log({ currentJobRegulatoryOpt: data });

  const { requirements } = useSelector((state) => state.requirementSetup);
  const addToGridBtn = useRef();

  // const handleClickEvent =()=>{
  //   setShow(false)
  //   addToGridBtn.current.click()
  //  }

  const actionBegin = (args) => {
    console.log({ args });

    if (args.requestType === "add") {
      args.cancel = true;
      setIsOpen(true);
    }

    if (args.requestType === "delete") {
      setJobRegulatoryOpt((prev) => prev.filter((x) => x != args.data[0]));
      setShowForm(true);
    }
  };

  const childGrid = {
    dataSource: [{ name: "Item" }, { name: "Item" }],
    queryString: "name",
    columns: [{ field: "name", headerText: "Requirement" }],
  };

  const detailTemplate = (props) => {
    const { jobRegulatoryRequiements } = props;

    return (
      <>
        <h6>Requirement</h6>
        <ul>
          {jobRegulatoryRequiements.map((x) => (
            <li key={x}>{x.name}</li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="p-4">
      {" "}
      <GridComponent
        toolbar={[{ text: "Add", align: "right" }]}
        ref={regTableRef}
        height={250}
        allowPaging={true}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top",
        }}
        actionBegin={actionBegin}
        dataSource={data}
        detailTemplate={detailTemplate}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="regulatoryOptionName"
            headerText="Regulatory Option"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="serviceName"
            headerText="Service"
            width="250"
            textAlign="left"
          />
          <ColumnDirective
            field="activityName"
            headerText="Activity"
            width="250"
            textAlign="left"
          />
          <ColumnDirective
            visible={false}
            field="serviceSequence"
            headerText="Activity"
            width="250"
            textAlign="left"
          />

          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
            commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject
          services={[Page, DetailRow, CommandColumn, Toolbar, Edit, Group]}
        />
      </GridComponent>
      <RegulatoryForm
        data={data}
        setJobRegulatoryOpt={setJobRegulatoryOpt}
        regTableRef={regTableRef}
        regulatoryOption={regulatoryOption}
        setRegulatoryOption={setRegulatoryOption}
        selectedServices={selectedService}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default RegulatoryTable;
