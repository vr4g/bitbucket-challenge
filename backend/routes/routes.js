const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const {
  getRepos,
  addRepo,
  deleteRepo,
  getRepoBySlug,
  getIssues,
  login,
  getWorkspaces,
  getPullRequestsOnRepo,
  getCommits,
} = require("../models/repo");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/repos/:workspace", getRepos);
router.get("/repo", bodyParser.json(), getRepoBySlug);
router.get("/repo/pull_requests", getPullRequestsOnRepo);
router.get("/repo/commits", getCommits);
router.post("/repo", addRepo);
router.delete("/repos", bodyParser.json(), deleteRepo);
router.get("/issues/:repo_slug", getIssues);
router.get("/login", bodyParser.json(), login);
router.get("/workspaces", getWorkspaces);

module.exports = router;
