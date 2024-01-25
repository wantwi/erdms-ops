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
import { CustomAxios } from "util/customAxios";
import {startConnection} from "../../../redux/notifications/action"
import useCustomApi from "api/useCustomApi";
import { FileUploader } from "react-drag-drop-files";
import jwt from "jsonwebtoken"
import useAuth from "hooks/useAuth";

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
  const [addNew, setAddNew] = useState(false);
  const [prevMetaData, setPrevMetaData] = useState([])
const [selectedRequirementId, setSelectedRequirementId] = useState()
const [otherDocumnets, setOtherDocumnets] = useState([])
const customApi = useCustomApi();
const {auth} = useAuth()
  //  const [notificationConnection, setNotificationConnection] = useState(null)


  const {connection} =  useSelector(state => state.notificationState)

  // const {signalConnection} = useSelector(state => state.jobmessagesState)

  console.log({signalConnection: connection})


  useEffect(() => {
    
    //dispatch(startChatConnection())
   // dispatch(startConnection()) 
    
  }, [])
  

  const getAssignedActiviy = async () => {
    setActivities([]);
    const request = await customApi.get(
      `Job/JobActivities/Officer`
    
    );

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



  const rowSelected = (args) => {
    console.log({args});
    setActivityInfo(args.data);
    showOtherDocument(args.data.id)


    dispatch(
      setJobHeaders({
        jobNumber: args.data.jobNumber,
        customerName: args.data.customerName,
        jobId: args.data.jobId,
      })
    );

    //dispatch(getJobMessages(args.data));

    console.log({ dd: args.data });

    //dispatch(getJobMessages(args.data.jobId));
   

    customApi
      .get(`Job/JobRequirements/${args.data.id}`)
      .then((res) => {
        console.log({JobRequirements: res });
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

  const getPreviousMetatData = async () => {
    try {
      const response = await  customApi.get(`Job/JobDocumentData/${selectedRequirementId}/all`)
      if(response){
        let ob = {id:1, name:"will"}
        setPrevMetaData(response.data)
       
      }
    } catch (error) {
      
    }
  }

  const  showOtherDocument = async (id) =>{
    
    try {
      const response =  await customApi.get(`Job/${id}/OtherJobDocuments`)

      console.log({response})
      setOtherDocumnets(response.data)
     
      
    } catch (error) {
      console.log({response2: error})
    }
    
   
    //
  }

  const handleSubmit = async (data) => {
     console.log({handleSubmit: data})    
    
    try {
     
      //file upload

      if(data?.file){
        let fd = new FormData();
        fd.append("file", inputFile.current.files[0]);
  
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
            getPreviousMetatData()
            getSelectRequirement(activityInfo.id);
           // setOpenModal(false);
            //setIsOpen(false);
            
            dispatch(setResponse("Data successfully saved.", true));
            dispatch(setResponse("", true));
            setAddNew(false)
          }
        }

      }else{
        let metaDataInfo = {
          jobRequirementId: requriementName.id,
          fileReferenceId: '00000000-0000-0000-0000-000000000000',
          data,
        };

        data.fileReferenceId = '00000000-0000-0000-0000-000000000000';

        const request = await customApi.post(
          `Job/JobDocumentData`,
          metaDataInfo
        );

        if (request) {
          getPreviousMetatData()
          getSelectRequirement(activityInfo.id);
         // setOpenModal(false);
          //setIsOpen(false);
          
          dispatch(setResponse("Data successfully saved.", true));
          dispatch(setResponse("", true));
          setAddNew(false)
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
    getAssignedActiviy()
    //getPersonnel();
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
            otherDocumnets={otherDocumnets}
            setOtherDocumnets={setOtherDocumnets}
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
              addNew={addNew}
              setAddNew={setAddNew}
              prevMetaData={prevMetaData}
              setPrevMetaData={setPrevMetaData}
              setSelectedRequirementId={setSelectedRequirementId}
              activityInfo={activityInfo}
            />
            
          </RequirementModal>

          {/* <DocumentForm openModal={openModal} setOpenModal={setOpenModal} title={document.id ? `Code: ${document.code}` : "New Document"} /> */}
          {/* <CardHeader
          title="Document Setup"
          btnText="Add New Document"
          btnClickHandler={btnClickHandler}
          textValue={text}
          setTextValue={SetText}
        >
          <DocumentSetupTable />
        </CardHeader> */}
          {/* <CustomModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={"New Document"}
          submitBtn ={submitBtn}
         
        >
         
        </CustomModal> */}
        </div>
      </div>
    </>
  );
};

export default UpdateActivity;
