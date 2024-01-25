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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

const setting = {
//   toolbar,
  height:300,
  allowPaging:false,
//   editSettings,
//   actionBegin,
};

const columns = [
    {
        headerText:"Name",
        field:"name",
        width:"500",
        textAlign:"left"
    },
    {
        headerText:"Description",
        field:"name",
        width:"200",
        textAlign:"left"
    },
    {
        headerText:"Date",
        field:"name",
        width:"100",
        textAlign:"left"
    }, {
        headerText:"Action",
        field:"name",
        width:"100",
        textAlign:"left"
    }
]

const CustomTable = (props) => {
  const { tableSettings,  data } = props;
  const { toolbar, height, allowPaging, editSettings, actionBegin } = setting;
  return (
    <div>
      <GridComponent
        dataSource={data ? data : []}
        actionBegin={actionBegin ? actionBegin : null}
        toolbar={toolbar ? toolbar : null}
        height={height ? height : 200}
        allowPaging={allowPaging ? allowPaging : false}
        editSettings={editSettings ? editSettings : null}
      >
       {columns? columns.map(x => <ColumnsDirective {...x}></ColumnsDirective>): <ColumnsDirective></ColumnsDirective>}

        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>
    </div>
  );
};

export default CustomTable;
