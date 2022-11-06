import React from "react";
import Commit from "../Commit";

const MapCommits = ({ commits }) => {
  return (
    <div>
      <h3>All commits</h3>
      {commits.map((data) => (
        <Commit commits={data} />
      ))}
    </div>
  );
};

export default MapCommits;
