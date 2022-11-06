import React from "react";
import Issue from "../Issue";

const Issues = ({ issues }) => {
  return (
    <div>
      {issues.map((issue) => (
        <Issue issue={issue} />
      ))}
    </div>
  );
};

export default Issues;
