import React from "react";
import Issue from "../Issue";

const Issues = ({ issues }) => {
  return (
    <div>
      <h3>Issues</h3>
      {issues.map((issue) => (
        <Issue issue={issue} />
      ))}
    </div>
  );
};

export default Issues;
