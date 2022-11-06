import { useState, useEffect } from "react";
import ShowWorkspaces from "./components/mapping/ShowWorkspaces";
import RepoDetails from "./components/RepoDetails";
import Auth from "./components/Auth";
import axios from "axios";
import ShowRepos from "./components/mapping/ShowRepos";

function App() {
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState([]);
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [auth, setAuth] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    showAll();
  }, [refresh]);

  async function showAll() {
    const response = await fetch("http://localhost:5000/workspaces");
    if (!response.ok) {
      console.log("Error!");
    }

    const data = await response.json();
    setWorkspaces(data.values);
  }

  const addRepo = async (workspace) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        workspace: workspace,
        name: name,
      },
    };
    const response = await axios.post(
      `http://localhost:5000/repo`,
      {},
      options
    );
    const data = await response.data;

    setRefresh((current) => !current);

    return data;
  };

  const onDelete = async (repo_slug, workspace) => {
    if (!window.confirm("Da li ste sigurni?")) {
      return;
    }

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        workspace: workspace,
        slug: repo_slug,
      },
    };
    const response = await axios.delete(`http://localhost:5000/repos`, options);
    const data = await response.data;
    return data;
  };

  const getRepos = async (workspace_slug) => {
    setSelectedWorkspace(workspace_slug);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `http://localhost:5000/repos/${workspace_slug}`,
      options
    );
    const data = await response.data;
    setRepos(data.values);
  };

  const getData = async (repo_slug, workspace) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        workspace: workspace,
        slug: repo_slug,
      },
    };
    const response = await axios.get(`http://localhost:5000/repo`, options);
    const data = await response.data;
    setSelectedRepo(data);
  };

  /*   const getRepos = async (workspace) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:5000/repos/${workspace}`,
      options
    );
    const data = await response.json();
    console.log(data);
    setRepos(data);
  }; */

  const getIssues = async (repo_slug) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:5000/issues/${repo_slug}`,
      options
    );
    const data = await response.json();
    setIssues(data.values);
  };

  return auth ? (
    <div className="main-body">
      <div className="workspaces">
        <div className="info">Workspaces</div>
        <ShowWorkspaces dataList={workspaces} getData={getRepos} />
      </div>

      <div className="details-container">
        <div className="heading">
          <h4>Repositories</h4>
          <button
            className="btn-add"
            onClick={() => {
              setAddNew((current) => !current);
            }}
          >
            Add new repository
          </button>
        </div>
        {addNew ? (
          <>
            <h3>Add new repository to '{selectedWorkspace}' workspace</h3>
            <form>
              <input
                type="text"
                placeholder="Repository name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </form>
            <button
              className="btn-add"
              onClick={() => {
                addRepo(selectedWorkspace);
                setName("");
              }}
            >
              Add repository
            </button>{" "}
          </>
        ) : (
          <div className="details">
            <div className="repos">
              <ShowRepos
                dataList={repos}
                onDelete={onDelete}
                getRepo={getData}
              />
            </div>

            <div className="container">
              <div className="more-info">
                {selectedRepo.length === 0 ? (
                  ""
                ) : (
                  <>
                    <RepoDetails
                      repo={selectedRepo}
                      onDelete={onDelete}
                      onClickIssues={getIssues}
                      issues={issues}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Auth setAuth={setAuth} />
  );
}

export default App;
