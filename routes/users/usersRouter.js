const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unBLockUser,
  ProfileViewers,
  followingUser,
  UnfollowingUser,
} = require("../../controllers/users/usersCtrl.js");
isLoggedin = require("../../middlewares/isLoggedin.js");

const usersRouter = express.Router();

// Register
usersRouter.post("/register", register);

// login
usersRouter.post("/login", login);

// Profile
usersRouter.get("/profile/", isLoggedin, getProfile);

// block user
usersRouter.put("/block/:userIdToBlock", isLoggedin, blockUser);

// Unblock user
usersRouter.put("/unblock/:userIdToUnBlock", isLoggedin, unBLockUser);

// profile Viewers
usersRouter.get("/profile_viewer/:userProfileId", isLoggedin, ProfileViewers);


//  User Unfollowing
usersRouter.put("/UnFollowing/:userIdToUnFollow", isLoggedin, UnfollowingUser);



// export
module.exports = usersRouter;
