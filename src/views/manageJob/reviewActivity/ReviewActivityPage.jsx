import axios from "axios";
import PageTitle from "components/common/PageTitle";
import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import CustomOverLay from "components/loader/CustomOverlay";
import UpdateActivityTable from "./table/UpdateActivityTable";
import JobRequirementTable from "./table/JobRequirementTable";
import RequirementModal from "./modal/RequirementModal";
import { getAllProcessOwner } from "redux/serviceProcess/actions";
import RemarksForm from "./form/RemarksForm";

import {
  getJobMessages,
  setJobHeaders,
  showMessageDialog,
} from "redux/messages/action";
import { CustomAxios } from "util/customAxios";
import useCustomApi from "api/useCustomApi";



const ReviewActivityPage = (props) => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [activities, setActivities] = useState([]);
  const [personnels, setPersonnels] = useState([]);
  const [isApproved, setIsApproved] = useState(true);
  const [showRemarksForm, setShowRemarksForm] = useState(false);
  const [rowData, setRowData] = useState({
    activity: "",
    service: { id: "", name: "" },
  });
  const [activityRequirement, setactivityRequirement] = useState([]);
  const [activityInfo, setActivityInfo] = useState({});
  const [requriementName, setRequriementName] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const submitBtn = useRef();
  const inputFile = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const customApi = useCustomApi();

  const getAssignedActiviy = async () => {
    setActivities([]);

    const request = await customApi.get(
      `Job/JobActivities/SendForReview`
    );
   
    console.log({ request });
    if (request) {
      setActivities(request.data);
    }
  };

  const handleApprove = () => {
    setIsApproved(true);

    setShowRemarksForm(true);
  };
  const handleDecline = () => {
    setIsApproved(false);
    setShowRemarksForm(true);
  };

  const handleRemarksSubmit = async (values) => {
    // dispatch(showLoader())

    try {
      const request = await customApi.put(
        `Job/JobActivity/Review`,
        {
          jobActivityId: activityInfo.id,
          remarks: values.remarks,
          status: isApproved ? "Approved" : "Declined",
        }
      );

      if (request) {
        console.log({ request });

        setShowRemarksForm(false);
        setOpenModal(false);
        dispatch(setResponse("Requirement reviewed successfully", true));

        dispatch(setResponse("", true));
      }
    } catch (error) {
      console.log({ error });
      dispatch(setResponse(error.response.data.errors[0].message, false));
      setShowRemarksForm(false);
      dispatch(setResponse("", true));
    }
    setOpenModal(false);
  };

  const getSelectRequirement = (id) => {
    customApi
      .get(`Job/JobRequirements/${id}`)
      .then((res) => {
        console.log({ output: res });
        res.data
          ? setactivityRequirement(res.data)
          : setactivityRequirement([]);
        setOpenModal(true);
      })
      .catch((error) => {
        console.log({ output: error });
        dispatch(
          setResponse(
            error.response?.data?.errors[0]?.message || "Something went wrong",
            false
          )
        );
      });
  };

  const getPersonnel = async () => {
    try {
      const request = await customApi.get(
        `Job/Personnels?results=1000`
      );

      if (request) {
        setPersonnels(request.data.items);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const rowSelected = (args) => {
    setActivityInfo(args.data);

    dispatch(
      setJobHeaders({
        jobNumber: args.data.jobNumber,
        customerName: args.data.customerName,
        jobId: args.data.jobId,
      })
    );

    console.log({ dd: args.data });

 //   dispatch(getJobMessages(args.data));

 customApi
      .get(`Job/JobRequirements/${args.data.id}`)
      .then((res) => {
        console.log({ res });
        setactivityRequirement(res.data);
        setOpenModal(true);
      })
      .catch((error) => {
        dispatch(
          setResponse(
            error.response?.data?.errors[0]?.message || "Something went wrong",
            false
          )
        );
      });

    //;
  };

  const handleSubmit = async (data) => {
    try {
      let fd = new FormData();
      fd.append("file", inputFile.current.files[0]);

      //file upload

      const document = await CustomAxios.post(`upload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (document) {
        let metaDataInfo = {
          jobRequirementId: requriementName.id,
          fileReferenceId: document.data.fileId,
          data,
        };

        data.fileReferenceId = document.data.fileId;

        const request = await CustomAxios.post(
          `Job/JobDocumentData`,
          metaDataInfo
        );

        if (request) {
          getSelectRequirement(activityInfo.id);
          setOpenModal(false);
          setIsOpen(false);

          dispatch(setResponse("Data successfully saved.", true));
          dispatch(setResponse("", true));
        }
      }
    } catch (error) {

      dispatch(
        setResponse(
          error.response?.data?.errors[0]?.message || "Something went wrong",
          false
        )
      );
      dispatch(setResponse("", true));
      setOpenModal(true);
      getSelectRequirement(activityInfo.id);
    }
    dispatch(setResponse("", true));
  };

  useEffect(() => {
    if (openModal) {
    } else {
      dispatch(showMessageDialog(false));
    }
  }, [openModal]);

  useEffect(() => {
    // getPersonnel();
    getAssignedActiviy()
    dispatch(hideLoader());
    return () => {};
  }, []);

  return (
    <>
      <div>
        <PageTitle
          title="TRANSACTION"
          className="plr-15"
          breadCrumb={[
            {
              name: "Manage Job",
            },
            {
              name: "Review Requirment",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Review Activity</span>
              </div>
              

              <UpdateActivityTable
                rowSelected={rowSelected}
                activities={activities}
                setOpenModal={setOpenModal}
                setRowData={setRowData}
              />
            </div>
          </div>

          <RequirementModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="show Modal"
            info={rowData}
            activityInfo={activityInfo}
            handleDecline={handleDecline}
            handleApprove={handleApprove}
          >
            <JobRequirementTable
              inputFile={inputFile}
              submitBtn={submitBtn}
              handleSubmit={handleSubmit}
              activityRequirement={activityRequirement}
              requriementName={requriementName}
              setRequriementName={setRequriementName}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              activityInfo={activityInfo}
            />
          </RequirementModal>
          <RemarksForm
            isOpen={showRemarksForm}
            setIsOpen={setShowRemarksForm}
            title="Add Remarks"
            handleRemarksSubmit={handleRemarksSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewActivityPage;
