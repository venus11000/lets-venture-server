const express = require("express");
const router = express.Router();

const { getJobs, createJob } = require("../controllers/job");

router.get("/list", getJobs);
router.post("/create", createJob);

module.exports = router;