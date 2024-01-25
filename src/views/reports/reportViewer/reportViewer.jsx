/* eslint-disable */
import React, { useRef, useEffect } from "react";
import axios from "axios";
//import './App.css';
import PageTitle from "components/common/PageTitle";
//Report Viewer source
import "@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min";
import "@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css";
//Data-Visualization
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min";
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min";
//Reports react base
import "@boldreports/react-reporting-components/Scripts/bold.reports.react.min";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useState } from "react";

var viewerStyle = { height: "900px", width: "100%" };

var parameterSettings = {
  hideParameterBlock: true
};

//reportServiceUrl = {'https://demos.boldreports.com/services/api/ReportViewer'}

function ReportViewer() {
  const reportViewer = useRef(null);

  const [selectedReport, setSelectedClient] = useState("");
  const [userToken, setuserToken] = useState();
  const [isReportReady, setIsReportReady] = useState(false);
  const reportName = useRef(null);

  function onDrillThrough(event) {
    console.log(event);
    event.actionInfo.ReportName = "PersonalDetails";
    event.actionInfo.Parameters = [
      {
        name: "SalesOrderNumber",
        labels: ["SO50751"]
      }
    ];
  }

  function handleSelectChange(e) {
    // console.log({selectedReport});
    setSelectedClient(e.target.value);
    localStorage.setItem("reportPath", e.target.value);
    console.log(e.target.value);
    window.location.reload(false);
    //setPath(e.target.value)
  }

  const getToken = async () => {
    const result = await axios.post(
      `https://demo.persol-apps.com:51355/reporting/api/site/site1/get-user-key`,
      {
        password: "Persol123!",
        userid: "paul.kodjo@persol.net"
      }
    );

    const { Token } = result.data;
    let { access_token, token_type } = JSON.parse(Token);
    let toten = `${token_type} ${access_token}`;
    console.log({ toten });
    setuserToken(toten);
  };

  useEffect(() => {
    getToken().then(res => {
      setIsReportReady(prev => true);
    });

    setSelectedClient(localStorage.getItem("reportPath"));

    console.log("Path", selectedReport);
  }, []);

  return (
    <div>
      <PageTitle title="Reports" className="plr-15" />
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 mb-3">
              <span className="hash"># </span>{" "}
              <span style={{ fontWeight: 600 }}>Reports</span>
            </div>
            <div>
              <div className="mb-2 row">
                <div className="col-sm-4">
                  <Label for="processType">Reports</Label>
                  <Input
                    ref={reportName}
                    type="select"
                    name="reportType"
                    id="reportType"
                    onChange={handleSelectChange}
                    //onChange={handleChange}
                    value={selectedReport || ""}
                  >
                    <option value="-1">Select Report</option>
                    <option value="LMS_ServiceActivities">
                      Service Process
                    </option>
                    <option value="LMS_Service_Listing">Services lising</option>
                    <option value="LMS_ActivityRequirements">
                      Activity Requirements
                    </option>
                    <option value="LMS_Activity_Listing">
                      Activity Listing
                    </option>
                    <option value="LMS_Requirement_Listing">
                      Requirement Listing
                    </option>
                    <option value="LMS_Document_Listing">
                      Document Listing
                    </option>
                    <option value="LMS_Job_Listing">
                      Job Listing
                    </option>
                    <option value="LMS_Job_Requirement">
                      Job Requirements
                    </option>
                    <option value="LMS_Equipment_Listing">
                      Equipment Listing
                    </option>
                    <option value="LMSCompanyListing">
                      Company Listing
                    </option>
                    <option value="LMSCompanyContacts">
                      Company Contacts
                    </option>
                    <option value="LMS_CustomerJobStatusSummaries">
                      Customer Job Status
                    </option>
                  </Input>
                </div>
              </div>
            </div>
          </div>

          <div style={viewerStyle}>
            {isReportReady && (
              <BoldReportViewerComponent
                id="reportviewer-container"
                reportServiceUrl={
                  "https://demo.persol-apps.com:51355/reporting/reportservice/api/Viewer"
                }
                reportServerUrl={
                  "https://demo.persol-apps.com:51355/reporting/api/site/site1/"
                }
                serviceAuthorizationToken={userToken}
                //reportPath = 'ISPSS/LMS_Document_Listing'
                reportPath={`LMS/${localStorage.getItem("reportPath")}`}
                //reportPath = {selectedReport}
                parameterSettings={parameterSettings}
                //drillThrough = {onDrillThrough}
              ></BoldReportViewerComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportViewer;
