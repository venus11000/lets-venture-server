const Job = require("../models/job");
const jwt = require("jsonwebtoken");            //  to generate signed user
const expressJwt = require("express-jwt");      //  for authorization check

exports.getJobs = (req, res) => {
    let { searchKeyword = "", jobType = "" } = req.query;
    let query = {
        "$or": [
            { title: { '$regex': searchKeyword, '$options': 'i' } },
            { location: { '$regex': searchKeyword, '$options': 'i' } },
            { companyName: { '$regex': searchKeyword, '$options': 'i' } },
            { experience: { '$regex': searchKeyword, '$options': 'i' } },
            { jobType: { '$in': jobType } }
        ]
    };

    Job.find(query)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json({ error: err, message: "something went wrong!" }));
}

exports.createJob = (req, res) => {
    const job = new Job(req.body);
    job.save()
        .then(job => res.json({ job }))
        .catch(err => res.status(400).json({ err }));
}