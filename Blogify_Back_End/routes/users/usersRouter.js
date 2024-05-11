const express = require("express");
const multer = require("multer");
const {
  register,
  login,
  getProfile,
  blockUser,
  unBLockUser,
  ProfileViewers,
  followingUser,
  UnfollowingUser,
  forgotPassword,
  resetPassword,
  accountVerificationEmail,
  verifyAccount
} = require("../../controllers/users/usersCtrl.js");
const storage = require("../../utils/fileUpload.js");
isLoggedin = require("../../middlewares/isLoggedin.js");

const usersRouter = express.Router();
// file upload middleware
const upload = multer({ storage });

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
usersRouter.put("/Following/:userIdToFollow", isLoggedin, followingUser);

//  User Unfollowing
usersRouter.put("/UnFollowing/:userIdToUnFollow", isLoggedin, UnfollowingUser);

// forgot password
usersRouter.post("/forgot-password", forgotPassword);

// reset password
usersRouter.post("/reset-password/:resetToken", resetPassword);
//  account verification email
usersRouter.put("/accountVerificationEmail", isLoggedin,accountVerificationEmail);

usersRouter.put("/account-verification/:verifyToken", isLoggedin,verifyAccount);




// export
module.exports = usersRouter;
