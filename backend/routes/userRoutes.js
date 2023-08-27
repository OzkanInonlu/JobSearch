const express = require("express");
const router = express.Router();
const {
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  createUserJobsHistory,
} = require("../controllers/userContoller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//user routes

// /api/allUsers
router.get("/allUsers", isAuthenticated, isAdmin, allUsers);

// /api/user/id
router.get("/user/:id", isAuthenticated, singleUser);

// /api/user/update/id
router.put("/user/update/:id", isAuthenticated, updateUser);

// /api/admin/user/delete/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);

// /api/user/jobsHistory
router.post("/user/jobsHistory", isAuthenticated, createUserJobsHistory);

module.exports = router;
