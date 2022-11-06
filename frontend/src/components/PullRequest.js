import React from "react";
import Style from "./modules/pullrequest.module.css";
import Moment from "moment";

const PullRequest = ({ pullRequests }) => {
  return (
    <div className={Style.container}>
      <div className={Style.styleInfo}>
        <h4>Author</h4> {pullRequests.author.display_name}
      </div>
      <div className={Style.styleInfo}>
        <h4>Title</h4> {pullRequests.title}
      </div>
      <div className={Style.styleInfo}>
        <h4>Description</h4> {pullRequests.description}
      </div>
      <div className={Style.styleInfo}>
        <h4>Branch</h4> {pullRequests.destination.branch.name}
      </div>
      <div className={Style.styleInfo}>
        <h4>State</h4> {pullRequests.state}
      </div>
      <div className={Style.styleInfo}>
        <h4>Created on</h4>{" "}
        {Moment(pullRequests.created_on).format("DD MMM YY | HH:MM")}
      </div>
      <div className={Style.styleInfo}>
        <h4>Updated on</h4>{" "}
        {Moment(pullRequests.updated_on).format("DD MMM YY | HH:MM")}
      </div>
    </div>
  );
};

export default PullRequest;
