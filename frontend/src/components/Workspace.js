import React from "react";
import Style from "./modules/data.module.css";

const Workspace = ({ data, getData }) => {
  return (
    <div className={Style.reposList}>
      <div
        className={Style.card}
        onClick={() => {
          getData(data.slug);
        }}
      >
        {data.name}
      </div>
    </div>
  );
};

export default Workspace;
