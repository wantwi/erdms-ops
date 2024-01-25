import React, { useEffect, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { data } from "./seed";
import className from "classnames";
import { GlobalContext } from "components/context/GlobalContext";
import LoaderComponent from "components/common/LoaderComponent";

const SideItem = ({ jobId }) => {
  let {
    msgJobs,
    fetchMessageJobs,
    customer,
    loggedInCustomerId,
    setSelectedJobName,
    isLoading,
    fetchMessages,
    emptyMessageStore,
    messages,
  } = useContext(GlobalContext);
  const history = useHistory();
  console.log({ msgJobs });
  useEffect(() => {
    fetchMessageJobs();
    emptyMessageStore();
    return () => {};
  }, []);

  // useCallback(
  //   () => {
  //     fetchMessages()
  //   },
  //   [jobId]
  // )

  let { pathname } = useLocation();
  pathname = pathname.split("/");
  pathname = pathname.slice(-1);
  const baseUrl = "/lms-job-tracker";

  const handleOnclick = (currID, currJobName) => {
    fetchMessages(currID);
    setSelectedJobName(currJobName);

    console.log({ messages });
    history.push(`${baseUrl}/track-messages/${currID}`);
  };
  const present = () => {
    return msgJobs.map((datum, i) => {
      return (
        <div onClick={() => handleOnclick(datum.id, datum.jobName)}>
          <hr className="mt-2 py-2 mx-3" key={i} />
          <div
            className={className(
              pathname == datum.id
                ? "msgCard sideItem isActiveSideItem"
                : "msgCard sideItem"
            )}
            style={{ display: "flex" }}
          >
            <img className="ml-3 msg-img" src={data[i]} alt="jobImg" />
            <p
              className="msg-text"
              style={{ alignSelf: "center", color: "#666" }}
            >
              {datum.jobName}
            </p>
          </div>
        </div>
      );
    });
  };

  return present();
};

export const Sidebar = ({ jobId }) => {
  let { isLoading } = useContext(GlobalContext);
  return (
    <div
      className="msgList"
      style={{
        width: "310px",
        height: "75vh",
        backgroundColor: "#ececec",
        marginBottom: "20px",
        marginRight: "-5px",
        marginTop: "25px",
        overflowY: "scroll"
      }}
    >
      <div
        className="msger-header-title font-weight-bold"
        style={{ color: "#5C258D" }}
      >
        <div className="sidebarHeader">
          <i className="fas fa-list-alt mt-2 mx-4 pt-2"></i>
          <>
            SELECT JOB
            <i className="fas fa-arrow-down mt-2 mx-4 pt-2"></i>
          </>
          {/* <input type="search" name="search here" id="" /> */}
        </div>
        {/* <LoaderComponent loading={isLoading}  /> */}
        <SideItem jobId={jobId} />
      </div>
    </div>
  );
};
