const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job category
exports.createJobType = async (req, res, next) => {
  try {
    const jobType = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      jobType,
    });
  } catch (error) {
    next(error);
  }
};

exports.allJobTypes = async (req, res, next) => {
  try {
    const jobType = await JobType.find();
    res.status(200).json({
      success: true,
      jobType,
    });
  } catch (error) {
    next(error);
  }
};

//update job type
exports.updateJobType = async (req, res, next) => {
  try {
    const jobType = await JobType.findByIdAndUpdate(
      req.params.type_id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      jobType,
    });
  } catch (error) {
    next(error);
  }
};

//delete job type
exports.deleteJobType = async (req, res, next) => {
  try {
    const jobType = await JobType.findByIdAndRemove(req.params.type_id);
    res.status(200).json({
      success: true,
      message: "Job type deleted",
    });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
};
