const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema;

//django models gibi
const jobsHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true, //to avoid spaces before and after
      maxlength: 75,
    },
    description: {
      type: String,
      trim: true, //to avoid spaces before and after
    },
    salary: {
      type: String,
      trim: true, //to avoid spaces before and after
    },
    location: {
      type: String,
    },
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    //link job model to user model
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

//django models gibi
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true, //to avoid spaces before and after
      required: [true, "First Name is required"],
      maxlength: 35,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
      maxlength: 35,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      maxlength: 40,
      unique: true,
      //pattern matching for email
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must have at least 8 characters"],
    },
    role: {
      type: Number,
      default: 0,
    },

    jobsHistory: [jobsHistorySchema],
  },
  { timestamps: true }
);

//encrypting(hash256) the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare the entered password with the password stored in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
