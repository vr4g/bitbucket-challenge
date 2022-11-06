import React from "react";
import Data from "../Data";
import Style from "../modules/repo.module.css";

const ShowRepos = ({ dataList, onDelete, onEdit, getRepo }) => {
  return (
    <div>
      {dataList.map((data) => (
        <div className={Style.repo}>
          <Data
            data={data}
            onDelete={onDelete}
            onEdit={onEdit}
            getRepo={getRepo}
          />
        </div>
      ))}
    </div>
  );
};

export default ShowRepos;
