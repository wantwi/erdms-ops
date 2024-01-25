/* eslint-disable */
import React, { useRef, useEffect } from "react";
//import './App.css';
import CustomOverLay from "components/loader/CustomOverlay";
import PageTitle from "components/common/PageTitle";
//Report Viewer source
import "@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min";
import "@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css";
//Data-Visualization
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min";
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min";
//Reports react base
import "@boldreports/react-reporting-components/Scripts/bold.reports.react.min";

var viewerStyle = { height: "1200px", width: "100%" };

var parameterSettings = {
  hideParameterBlock: true
};

//reportServiceUrl = {'https://demos.boldreports.com/services/api/ReportViewer'}

function ReportViewer() {
  const reportViewer = useRef(null);
  return (
    <div>
      <PageTitle
        title="Setup"
        className="plr-15"
        breadCrumb={[
          {
            name: "Service Process"
          },
          {
            name: "Service Type"
          }
        ]}
      />
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
                  <div className="search-box me-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <label for="search-bar-0" className="search-label">
                        <span id="search-bar-0-label" className="sr-only">
                          Search process
                        </span>
                        <input
                          id="search-bar-0"
                          type="text"
                          aria-labelledby="search-bar-0-label"
                          class="form-control "
                          placeholder="Search"
                          //value={text}
                          onChange={e => SetText(e.target.value)}
                        />
                      </label>
                      <i class="bx bx-search-alt search-icon"></i>
                    </div>
                  </div>
                </div>
                <div class="col-sm-8 ">
                  <div class="text-sm-end" style={{ float: "right" }}>
                    <button
                      type="button"
                      class="btn-rounded mb-2 me-2 btn btn-primary"
                      //onClick={btnClickHandler}
                    >
                      <i class="mdi mdi-plus me-1"></i> Add New Process
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <ApplicationTypeTable setOpenModal={setOpenModal} /> */}
          </div>
          <BoldReportViewerComponent
            //https://psl-app-vm3:63042/reporting/en-us/site/site1/reports/c1f3cd1b-0086-4e8b-89c4-a2ae3f19cdb6/ISPSS/LMS_Document_Listing?showmyreports=1
            id="reportviewer-container"
            reportServiceUrl={
              "https://demos.boldreports.com/services/api/ReportViewer"
            }
            //reportServiceUrl= {"http://psl-app-vm3:63040/reporting/reportservice/api/Viewer"}
            reportPath={"~/Resources/docs/sales-order-detail.rdl"}
            //reportServiceUrl= {'http://psl-app-vm3:63040/reporting/en-us/site/site1/reports/'}
            //reportServerUrl= {"http://psl-app-vm3:63040/reporting/api/site/site1/reports/"}
            //reportPath = {'ISPSS/LMS_ServiceActivities'}
            // parameterSettings = { parameterSettings }
          ></BoldReportViewerComponent>
        </div>

        {/* <ServiceTypeForm openModal={openModal} setOpenModal={setOpenModal}  title={process.id? `Code: ${process.code}`: "New Process"}   /> */}
        {/* <CardHeader
          title="Service Process"
          btnText="Add New Service"
          btnClickHandler={btnClickHandler}
          textValue={text}
          setTextValue={SetText}
        >
          <ApplicationTypeTable />
        </CardHeader> */}
        {/* <CustomModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={"New Service"}
          submitBtn={submitBtn}
        >
          <ServiceTypeForm submitBtn={submitBtn} />
        </CustomModal> */}
      </div>
    </div>
  );
}

export default ReportViewer;
