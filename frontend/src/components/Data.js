import React from "react";
import Style from "./modules/data.module.css";

const Data = ({ data, onDelete, onEdit, getRepo }) => {
  return (
    <div
      className={Style.card}
      onClick={() => {
        getRepo(data.slug, data.workspace.slug);
      }}
    >
      {data.name}
    </div>
  );
};

export default Data;
