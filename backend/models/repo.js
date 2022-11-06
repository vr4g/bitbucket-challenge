//const base64 = require("base-64");
const axios = require("axios");
const qs = require("query-string");

require("dotenv").config();

const URL_PREFIX = "https://api.bitbucket.org/2.0";

let token = "";

login = async (req, res) => {
  try {
    const response = await axios({
      url: `https://bitbucket.org/site/oauth2/access_token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: req.query.username,
        password: req.query.password,
      },
      method: "post",
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
    });
    token = response.data.access_token;
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
/* login = async (req, res) => {
  USER_NAME = req.query.username;
  PASSWORD = req.query.password;
  try {
    const response = await axios({
      url: `${URL_PREFIX}/workspaces`,
      method: "get",
      headers: {
        Authorization: "Basic " + base64.encode(USER_NAME + ":" + PASSWORD),
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
}; */

getPullRequestsOnRepo = async (req, res) => {
  try {
    const response = await axios({
      url: `${URL_PREFIX}/repositories/${req.query.workspace}/${req.query.repo}/pullrequests`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

getCommits = async (req, res) => {
  try {
    const response = await axios({
      url: `${URL_PREFIX}/repositories/${req.query.workspace}/${req.query.repo}/commits`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

getWorkspaces = async (req, res) => {
  try {
    const response = await axios({
      url: `${URL_PREFIX}/workspaces?pagelen=100`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

getRepos = async (req, res) => {
  try {
    const response = await axios({
      url: `${URL_PREFIX}/repositories/${req.params.workspace}?pagelen=100`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

getRepoBySlug = async (req, res) => {
  try {
    const response = await axios({
      url: `${URL_PREFIX}/repositories/${req.query.workspace}/${req.query.slug}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

addRepo = async (req, res) => {
  const bodyData = `
  {
      "type": "repository",
      "name" : "${req.query.name}",
      "is_private" : false,
      "has_issues": true,
      "has_wiki": true,
      "mainbranch": {
        "type": "main"
      }
  }`;

  try {
    await axios({
      method: "post",
      url: `${URL_PREFIX}/repositories/${req.query.workspace}/${req.query.name}`,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    });
  } catch (err) {
    console.log(err);
  }
};

deleteRepo = async (req, res) => {
  try {
    await axios({
      method: "delete",
      url: `${URL_PREFIX}/repositories/${req.query.workspace}/${req.query.slug}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

getIssues = async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: `${URL_PREFIX}/repositories/vr44g/${req.params.repo_slug}/issues`,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRepos,
  getRepoBySlug,
  addRepo,
  deleteRepo,
  getIssues,
  login,
  getWorkspaces,
  getPullRequestsOnRepo,
  getCommits,
};
