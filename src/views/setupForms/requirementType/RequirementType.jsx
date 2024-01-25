import PageTitle from "components/common/PageTitle";
import RequirementTypeTable from "components/tables/syncfussionTable/RequirementTypeTable/RequirementTypeTable";
import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
//import Button from "components/button/Button";

const RequirementType = props => {
  return (
    <div>
      <PageTitle
        title="Setup"
        className="plr-15"
        breadCrumb={[
          {
            name: "Service process"
          },
          {
            name: "Requirement Type"
          }
        ]}
      />
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1">
              <span className="hash"># </span> Requirement Type
            </div>
            <div>
              <div className="row m-0 p-0 mt-3">
                <div className="col-sm-4 p-0 m-0">
                  <InputGroup>
                    <Input
                      className="react-form-input"
                      style={{ borderRadius: "5px 0px 0px 5px !important" }}
                      placeholder="Search ..."
                    />
                    <InputGroupAddon addonType="append">
                      <button
                        className="top-header-icon"
                        style={{
                          background: "#563c91",
                          borderRadius: "0 5px 5px 0"
                        }}
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </div>
            <RequirementTypeTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementType;
