const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//django models gibi
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true, //to avoid spaces before and after
      required: [true, "Job title is required"],
      maxlength: 75,
    },
    description: {
      type: String,
      trim: true, //to avoid spaces before and after
      required: [true, "Job description is required"],
    },
    salary: {
      type: String,
      trim: true, //to avoid spaces before and after
      required: [true, "Job salary is required"],
    },
    location: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },

    //link job model to user model
    user: {
        type: ObjectId,
        ref : "User",
        required: true,
    },
    //link job model to jobtype model
    jobType: {
        type: ObjectId,
        ref : "JobType",
        required: true,
    },
  },


  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
