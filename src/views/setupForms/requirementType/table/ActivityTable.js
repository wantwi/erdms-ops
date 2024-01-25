import React from "react";
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
import { DataManager } from "@syncfusion/ej2-data";
import { DropDownList } from "@syncfusion/ej2-dropdowns";

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
  write: args => {
    dropdownObjr = new DropDownList({
      //Custom DropDownList component
      dataSource: new DataManager([
        { status: "Active", value: 1 },
        { status: "inactive", value: 0 }
      ]),
      fields: { text: "status", value: "value" },
      value: args.rowData[args.column.field],
      actionComplete: () => false,
      allowFiltering: true,
      popupHeight: "300px"
    });
    dropdownObjr.appendTo(elem);

    //	write function is used to create custom component or assign default value at time of editing.
  }
};

const ActivityTable = () => {
  const actionBegin = args => {};

  return (
    <div className="p-4">
      {" "}
      <GridComponent
        toolbar={[{ text: "Add" }]}
        height={350}
        allowPaging={true}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top"
        }}
        actionBegin={actionBegin}
        dataSource={[]}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="300"
            textAlign="left"
            editType="dropdownedit"
            edit={dropdownTemp}
          />

          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
            commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>
    </div>
  );
};

export default ActivityTable;
