import React from "react";
import Workspace from "../Workspace";

const ShowWorkspaces = ({ dataList, getData }) => {
  return (
    <div>
      {dataList.map((workspaces) => (
        <Workspace data={workspaces} getData={getData} />
      ))}
    </div>
  );
};

export default ShowWorkspaces;
