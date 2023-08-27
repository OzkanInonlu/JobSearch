const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  logOut,
  userProfile,
} = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");

//auth routes

// /api/signUp
router.post("/signUp", signUp); //post

// /api/signIn
router.post("/signIn", signIn); //post

// /api/logOut
router.get("/logOut", logOut); //get

// /api/me
router.get("/me", isAuthenticated, userProfile);


module.exports = router;
