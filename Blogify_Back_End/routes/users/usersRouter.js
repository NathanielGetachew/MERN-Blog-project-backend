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
  
  verifyAccount,
  getPublicProfile,
  uploadeCoverImage,
  uploadeProfilePicture,
  accountVerificationEmail,
  updateUserProfile
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

// Public Profile
usersRouter.get("/public-profile/:userId", getPublicProfile);

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

usersRouter.get("/account-verification/:verifyToken", isLoggedin,verifyAccount);

// upload Cover Image
usersRouter.put("/upload-cover-image", isLoggedin,upload.single("file"), uploadeCoverImage);

// upload  profile Image
usersRouter.put("/upload-profile-image",isLoggedin,upload.single("file"),uploadeProfilePicture);

//  update  profile
usersRouter.put("/update-profile:", isLoggedin, updateUserProfile);







// export
module.exports = usersRouter;
