const Job = require("../models/job");

exports.getJobs = (req, res) => {
    let { searchKeyword = "", jobType = "", location = "", experience = "" } = req.query;

    let orQuery = [];

    searchKeyword && orQuery.push({ title: { '$regex': searchKeyword.trim(), '$options': 'i' } });
    location && orQuery.push({ location: { '$regex': location.trim(), '$options': 'i' } });
    searchKeyword && orQuery.push({ companyName: { '$regex': searchKeyword.trim(), '$options': 'i' } });
    experience && orQuery.push({ experience: { '$regex': experience.trim(), '$options': 'i' } });
    jobType && orQuery.push({ jobType: { '$in': jobType } });
    let query = {
        "$or": orQuery
    };

    (orQuery.length > 0 ? Job.find(query) : Job.find())
        .sort({ createdAt: -1 })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json({ error: err, message: "something went wrong!" }));
}

exports.createJob = (req, res) => {
    const job = new Job(req.body);
    job.save()
        .then(job => res.json({ job }))
        .catch(err => res.status(400).json({ err }));
}