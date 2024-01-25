import React from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
//import ClientSideTable from "components/reacttable/ClientSideTable";
import ServerSideTable from "components/reacttable/ServerSideTable";


const ApplicationTable = props => {
 
  const activeColor = {
    color: "#563c91"
  };
  return (
    <div>
      <PageTitle
        title="sidebar.reacttables"
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.tables"
          },
          {
            name: "sidebar.reacttables"
          }
        ]}
      />
      <div className="plr-15">
        <div className="mb-15">
          <div className="introduction" style={activeColor}>
            Introduction
          </div>
          <div className="intro-detail">
            <span className="chip">react-table</span> is a lightweight, fast and
            extendable datagrid built for React.
          </div>
        </div>
        
       
        <ServerSideTable />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(ApplicationTable);
