import React from "react";
import PageTitle from "components/common/PageTitle";
import { MessageUI } from "./MessageUI";

export const MessageTracking = () => {
  return (
    <div>
      <PageTitle
        title="Job Tracking"
        className="plr-15"
        breadCrumb={[
          {
            name: "Track",
          },
          {
            name: "Job Status",
          },
        ]}
      />
          <div className="plr-15">
              
        <MessageUI />
      </div>
    </div>
  );
};
