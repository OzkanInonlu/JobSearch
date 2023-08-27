const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      user: req.user.id,
      jobType: req.body.jobType,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// all jobs
exports.allJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        // search acc to the title
        title: {
          $regex: req.query.keyword,
          $options: "i", //to remove case sensitivity in search
        },
      }
    : {};

  //filter jobs by category/type id's

  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 }); //only get the ids'

  // add the id of the job types to the ids array
  jobTypeCategory.map((category) => {
    ids.push(category._id);
  });

  let cat = req.query.cat;
  let category = cat !== "" ? cat : ids;

  // jobs by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 }); //only get the locations

  jobByLocation.map((job) => {
    locations.push(job.location);
  });
  //avoid the repetition of the same location in the array
  let locationSet = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : locationSet;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //const count = await Job.find().estimatedDocumentCount();
  const count = await Job.find({
    ...keyword,
    jobType: category,
    location: locationFilter,
  }).countDocuments();

  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: category,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");

    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      locationSet,
    });
  } catch (error) {
    next(error);
  }
};

// single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("jobType", "jobTypeName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// update job
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};
