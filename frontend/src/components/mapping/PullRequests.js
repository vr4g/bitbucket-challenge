import React from "react";
import PullRequest from "../PullRequest";

const PullRequests = ({ pullRequests }) => {
  return (
    <div>
      <h3>Pull requests</h3>
      {pullRequests.map((data) => (
        <PullRequest pullRequests={data} />
      ))}
    </div>
  );
};

export default PullRequests;
