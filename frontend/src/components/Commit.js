import React from "react";
import Style from "./modules/commit.module.css";
import Moment from "moment";

const Commit = ({ commits }) => {
  return (
    <div className={Style.container}>
      <div className={Style.styleInfo}>
        <h4>Author</h4> {commits.author.user.display_name}
      </div>
      <div className={Style.styleInfo}>
        <h4>Message</h4> {commits.message}
      </div>
      <div className={Style.styleInfo}>
        <h4>Date</h4> {Moment(commits.date).format("DD MMM YY | HH:MM")}
      </div>
    </div>
  );
};

export default Commit;
