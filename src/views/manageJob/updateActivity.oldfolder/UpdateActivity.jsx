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
import {
  getJobMessages,
  setJobHeaders,
  showMessageDialog,
  startChatConnection,
} from "redux/messages/action";

import { startConnection } from "../../../redux/notifications/action";
import useCustomApi from "api/useCustomApi";

const UpdateActivity = (props) => {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const [activities, setActivities] = useState([]);
  const [personnels, setPersonnels] = useState([]);
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
  // const [notificationConnection, setNotificationConnection] = useState(null)

  const { connection } = useSelector((state) => state.notificationState);

  const { signalConnection } = useSelector((state) => state.jobmessagesState);

  console.log({ signalConnection: connection });

  useEffect(() => {
    //dispatch(startChatConnection())
    // dispatch(startConnection())
  }, []);

  const getAssignedActiviy = async () => {
    setActivities([]);
    const request = await customApi.get(`Job/JobActivities/Officer/${text}`);

    console.log({ request });
    if (request) {
      setActivities(request.data);
    }
  };

  const btnClickHandler = () => {
    setOpenModal(true);
  };

  const getSelectRequirement = (id) => {
    customApi
      .get(`Job/JobRequirements/${id}`)
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
  };

  const getPersonnel = async () => {
    try {
      const request = await customApi.get(`Job/Personnels?results=1000`);

      if (request) {
        setPersonnels(request.data.items);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const rowSelected = (args) => {
    console.log({ args });
    setActivityInfo(args.data);

    dispatch(
      setJobHeaders({
        jobNumber: args.data.jobNumber,
        customerName: args.data.customerName,
        jobId: args.data.jobId,
      })
    );

   // dispatch(getJobMessages(args.data));

    console.log({ dd: args.data });

    

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

      const document = await customApi.post(`upload`, fd, {
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

        const request = await customApi.post(
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

  const sendForReviewEvent = () => {
    dispatch(setResponse("Please wait", true));
    customApi
      .put(`Job/JobActivity/SendForReview`, {
        jobActivityId: activityInfo.id,
        remarks: "string",
      })
      .then((res) => {
        dispatch(setResponse("Request for approval sent successfully.", true));
      })
      .catch((error) => {
        console.log({ error });
        dispatch(
          setResponse(
            error.response?.data?.errors[0]?.message || "Something went wrong",
            false
          )
        );
      });
    dispatch(setResponse("", true));
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
    } else {
      dispatch(showMessageDialog(false));
    }
  }, [openModal]);

  useEffect(() => {
    getPersonnel();
    dispatch(hideLoader());

    return () => {
      dispatch(showMessageDialog(false));
    };
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
              name: "Update Activity",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Update Activity</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label for="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search this table
                          </span>
                          <select
                            className="form-control"
                            style={{ width: 300, marginRight: 20 }}
                            onChange={(e) => SetText(e.target.value)}
                          >
                            <option selected disabled>
                              Select officer
                            </option>
                            {personnels.map((x) => (
                              <option key={x.id} value={x.id}>
                                {x.firstName} {x.lastNName}
                              </option>
                            ))}
                          </select>
                        </label>
                        <i
                          class="bx bx-search-alt search-icon btn btn-sm btn-primary"
                          onClick={getAssignedActiviy}
                        >
                          Show activity(s)
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
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
            sendForReviewEvent={sendForReviewEvent}
          >
            <JobRequirementTable
              inputFile={inputFile}
              submitBtn={submitBtn}
              handleSubmit={handleSubmit}
              activityRequirement={activityRequirement}
              requriementName={requriementName}
              setRequriementName={setRequriementName}
              isOpen={isOpen}
              activityInfo={activityInfo}
              setIsOpen={setIsOpen}
            />
          </RequirementModal>

        
        </div>
      </div>
    </>
  );
};

export default UpdateActivity;
