const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//django models gibi
const jobTypeSchema = new mongoose.Schema(
  {
    jobTypeName: {
      type: String,
      trim: true, //to avoid spaces before and after
      required: [true, "Job category is required"],
      maxlength: 75,
    },
    //link job type model to user model
    user: {
        type: ObjectId,
        ref : "User",
        required: true,
    },
  },


  { timestamps: true }
);

module.exports = mongoose.model("JobType", jobTypeSchema);
