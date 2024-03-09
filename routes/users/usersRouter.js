const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unBLockUser,
  ProfileViewers,
} = require("../../controllers/users/usersCtrl.js");
isLoggedin = require("../../middlewares/isLoggedin.js")


const usersRouter = express.Router();

// Register
usersRouter.post("/register", register);

// login
usersRouter.post("/login", login);

// Profile
usersRouter.get("/profile/",isLoggedin, getProfile);

// block user
usersRouter.put("/block/:userIdToBlock",isLoggedin, blockUser);

// Unblock user
usersRouter.put("/unblock/:userIdToUnBlock",isLoggedin, unBLockUser);

usersRouter.get("/profile_viewer/:userProfileId",isLoggedin,ProfileViewers);






// export
module.exports = usersRouter;
