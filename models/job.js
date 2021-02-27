const mongoose = require("mongoose");
const crypto = require("crypto");
// const uuidv1 = require("uuid/dist/v1");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
