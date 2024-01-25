import React from 'react'
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

const SegTable = () => {
  return (
    <div> <GridComponent
    pageSettings={{ pageCount: 4, pageSizes: true }}
    height={250}
    // allowPaging={true}
    editSettings={{
      allowEditing: false,
      allowAdding: true,
      allowDeleting: true,
      newRowPosition: "Top"
    }}
    // actionBegin={actionBegin}
    dataSource={[]}
    // rowSelected={rowSelected}
  >
    <ColumnsDirective>
      <ColumnDirective
        field="name"
        headerText="Segment"
        textAlign="left"
      />
     
      <ColumnDirective
        headerText="Action"
        width="100"
        textAlign="center"
        // template={actionTemp}
      // commands={commands}
      ></ColumnDirective>
    </ColumnsDirective>
    <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
  </GridComponent>
</div>
  )
}



export default SegTable