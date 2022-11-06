import React from "react";
import Style from "./modules/issue.module.css";

const Issue = ({ issue }) => {
  return (
    <div className={Style.container}>
      <div className={Style.styleInfo}>
        <h4>Title</h4> {issue.title}
      </div>
      <div className={Style.styleInfo}>
        <h4>Description</h4> {issue.content.raw}
      </div>
    </div>
  );
};

export default Issue;
