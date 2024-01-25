import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import TableWrapper from "./genericTable.style";

const data =[
              {
                name:"Acquire EPA Permit",
                days:5,
               
            },
            {
              name:"Acquire FDA Permit",
              days:5,
           
          },
          {
            name:"Acquire Building Permit",
            days:5,
        }
]

const GenericTable = () => {
  return (
    <TableWrapper>
     
      <GridComponent dataSource={data}>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Name" width="300" textAlign="left" />
          <ColumnDirective field="days" headerText="TAT(Days)" width="150" textAlign="left" />
          <ColumnDirective field="Action" width="150" textAlign="left" />
         
        </ColumnsDirective>
      </GridComponent>
    </TableWrapper>
  );
};

export default GenericTable;
