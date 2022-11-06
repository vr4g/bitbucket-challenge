import React from "react";
import Style from "./modules/repo_details.module.scss";
import Issues from "./mapping/Issues";
import { useState, useEffect } from "react";
import axios from "axios";
import PullRequests from "./mapping/PullRequests";
import MapCommits from "./mapping/MapCommits";
import Moment from "moment";

const RepoDetails = ({ repo, onDelete, onClickIssues, issues }) => {
  const [showIssues, setShowIssues] = useState(false);
  const [showPullRequests, setShowPullRequests] = useState(false);
  const [showCommits, setShowCommits] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pullRequests, setPullRequests] = useState([]);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    setShowIssues(false);
    setShowPullRequests(false);
    setShowCommits(false);
  }, [repo]);

  const getPullRequestsOnRepo = async (workspace_slug, repo_slug) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        workspace: workspace_slug,
        repo: repo_slug,
      },
    };
    const response = await axios.get(
      `http://localhost:5000/repo/pull_requests`,
      options
    );
    const data = await response.data;
    setPullRequests(data.values);
  };

  const getCommits = async (workspace_slug, repo_slug) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        workspace: workspace_slug,
        repo: repo_slug,
      },
    };
    const response = await axios.get(
      `http://localhost:5000/repo/commits`,
      options
    );
    const data = await response.data;
    setCommits(data.values);
  };

  return (
    <div className={Style.main}>
      <h2> {repo.name}</h2>
      <div className={Style.leftRight}>
        <div className={Style.left}>
          <div className={Style.inlineInfo}>
            <h4>Owner</h4> <span>{repo.owner.display_name}</span>
          </div>
          <div className={Style.inlineInfo}>
            <h4>Workspace</h4> <span>{repo.workspace.name}</span>
          </div>

          <div className={Style.inlineInfo}>
            <h4>Project</h4> <span>{repo.project.name}</span>
          </div>
          <br></br>
          <p className={Style.info}>
            Created on: {Moment(repo.created_on).format("DD MMM YYYY | HH:MM")}
          </p>
        </div>
        <div className={Style.right}>
          <div>
            <button className={Style.btnDelete}>Delete repo</button>
            <button
              className={Style.btn}
              onClick={() => {
                onClickIssues(repo.slug);
                setShowIssues((current) => !current);
                setShowPullRequests(false);
                setShowCommits(false);
              }}
            >
              List issues
            </button>
          </div>
          <div>
            <button
              className={Style.btn}
              onClick={() => {
                getPullRequestsOnRepo(repo.workspace.slug, repo.slug);
                setShowPullRequests(true);
                setShowIssues(false);
                setShowCommits(false);
              }}
            >
              List pull requests
            </button>
            <button
              className={Style.btn}
              onClick={() => {
                getCommits(repo.workspace.slug, repo.slug);
                setShowCommits(true);
                setShowPullRequests(false);
                setShowIssues(false);
              }}
            >
              List commits
            </button>
          </div>
          {showPullRequests && <PullRequests pullRequests={pullRequests} />}
          {showCommits && <MapCommits commits={commits} />}
          <div>
            {showIssues &&
              (issues.length === 0 ? (
                "no issues to show"
              ) : (
                <Issues issues={issues} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
