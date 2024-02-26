import React, { useRef, useState } from "react";
import axios from "axios";
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
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/assignactivity/action";
import MetadataModal from "../modal/MetadataModal";
import ListingTypeForm from "../form/ListingTypeForm";
import Moment from "react-moment";
import { CustomAxios } from "util/customAxios";
import useCustomApi from "api/useCustomApi";

const actionTemp = ({ code }) => {
  return (
    <div onClick={console.log({ code })}>
      <i className="fa fa-eye"></i>
    </div>
  );
};

const dateTemplate = ({ date }) => {
  return (
    <Moment format="MMM DD YYYY" withTitle>
      {date}
    </Moment>
  );
};

const statusTemplate = ({ status }) => {
  return status === "Uploaded" ? (
    <span
      className="bg-light-success"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "100px"
      }}
    >
      {"Completed"}
    </span>
  ) : (
    <span
      className="bg-light-danger"
      style={{
        textAlign: "left",
        borderRadius: "5px",
        margin: 0,
        padding: "5px 10px",
        width: "100px"
      }}
    >
      {"Incomplete"}
    </span>
  );
};

const JobRequirementTable = ({
  isOpen,
  setIsOpen,
  inputFile,
  setOpenModal,
  handleSubmit,
  setRowData,
  activityRequirement,
  submitBtn,
  requriementName,
  setRequriementName,
  addNew,
  prevMetaData,
  setPrevMetaData,
  setAddNew,
  setSelectedRequirementId,
  activityInfo
}) => {
  const dispatch = useDispatch();
  const customApi = useCustomApi();

  const [metata, setMetata] = useState([]);

  const modalRef = useRef();

  const rowSelected = args => {
    setRequriementName(args.data);
    setSelectedRequirementId(args.data.id);

    customApi
      .get(`Job/${args.data.id}/metadata`)
      .then(result => {
        console.log({ JobDocumentData: result });
        // console.log({ setMetata: result?.data.metadata });
        // setMetata(result?.data.metadata);
        setMetata(result.data);

        setIsOpen(true);
      })
      .catch(error => {
        console.log({ braking: error });
      });

    customApi
      .get(`Job/JobDocumentData/${args.data.id}/all`)
      .then(result => {
        setPrevMetaData(result.data);
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const actionBegin = args => {
    if (args.requestType === "add") {
      args.cancel = true;
      // setShowModal(!showModal);
    }
  };
  console.log({ activityInfo });
  return (
    <div className="mt-2">
      <GridComponent
        // toolbar={[{ text: "Add", align: "right" }]}
        height={300}
        allowPaging={false}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Top"
        }}
        actionBegin={actionBegin}
        dataSource={activityRequirement}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="requirementName"
            headerText="Requirement"
            width="200"
            textAlign="left"
          />
          <ColumnDirective
            field="updatedAt"
            headerText="Date"
            width="100"
            textAlign="left"
            template={dateTemplate}
          />
          <ColumnDirective
            field="status"
            headerText="Status"
            width="100"
            textAlign="left"
            template={statusTemplate}
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

      <MetadataModal
        ref={modalRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        submitBtn={submitBtn}
        addNew={addNew}
        setAddNew={setAddNew}
      >
        <ListingTypeForm
          setIsOpen={setIsOpen}
          inputFile={inputFile}
          requriementName={requriementName.requirementName}
          submitBtn={submitBtn}
          handleSubmit={handleSubmit}
          metata={metata}
          addNew={addNew}
          setAddNew={setAddNew}
          prevMetaData={prevMetaData}
          activityInfo={activityInfo}
        />
      </MetadataModal>
    </div>
  );
};

export default JobRequirementTable;
