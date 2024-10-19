const User = require("../../model/User/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const expressAsyncHandler = require("express-async-handler");
const sendEmail = require("../../utils/sendEmail");
const SendAccVerificationEmail = require("../../utils/SendAccVerificationEmail");

//@desc Register a new user
//@route POST /api/v1/users/register
//@access Public

exports.register = asynchandler(async (req, res) => {
  //get the details
  const { username, password, email } = req.body;
  // check if the user exists already
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User already Exists");
  }
  // Register the new user
  const newUser = new User({
    username,
    email,
    password,
  });
  // hash the password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  // save the user to database
  await newUser.save();
  res.status(201).json({
    status: "successful",
    message: "User Rgistered Successfully",
    //_id: newUser?.id,
    //username: newUser?.username,
    //email: newUser?.email,
    // role: newUser?.role,
    newUser,
  });
});

// login a registered user
//@route POST /api/v1/users/login
//@access Public

exports.login = asynchandler(async (req, res) => {
  // get the login details
  const { username, password } = req.body;
  // check if the user exists in the database
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new Error("Invalid login Credentials");
  }
  // compare the hashed password with the one the  user entered
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login Credentials");
  }

  // Code that follows the throw statement
  // update the last login

  user.lastLogin = new Date();
  res.json({
    status: "Success",
    username: user?.username,
    email: user?.email,
    _id: user?._id,
    role: user?.role,
    token: generateToken(user),
    profilePicture: user?.profilePicture,
    isVerified: user?.isVerified,
  });
});

//@des Get profile
//@route GET /api/v1/users/profile/:id
//@access Public

exports.getProfile = asynchandler(async (req, res, next) => {
  // trigger custom error

  const id = req.userAuth?._id;
  const user = await User.findById(id)
    .populate({
      path: "posts",
      model: "Post",
    })
    .populate({
      path: "following",
      model: "User",
    })
    .populate({
      path: "followers",
      model: "User",
    })
    .populate({
      path: "blockedUsers",
      model: "User",
    })
    .populate({
      path: "profileViewers",
      model: "User",
    });

  res.json({
    status: "success",
    message: "Profile fetched",
    user,
  });
});

//@des Get publicprofile
//@route  GET /api/v1/users/Public-profile/:userId
//@access Public

exports.getPublicProfile = asynchandler(async (req, res, next) => {
  // trigger custom error

  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "category",
      },
    });

  res.json({
    status: "success",
    message: "Public Profile fetched",
    user,
  });
});

//@des Blcok user
//@route POST /api/v1/users/block/:userIdToBlock
//@access private
exports.blockUser = asynchandler(async (req, res) => {
  // find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    throw new Error("user to block is not found");
  }

  // user who is blocking
  const userBlocking = req.userAuth._id;

  // check if the user is blocking him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("can't Block your self");
  }
  // find the current user
  const currentUser = await User.findById(userBlocking);
  // check if the user is already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already Blocked");
  }
  // push the user to the blocked in the array of the current user
  currentUser?.blockedUsers.push(userIdToBlock);
  await currentUser.save();

  res.json({
    message: "user Blocked Succesfully",
    status: "successs",
    currentUser,
  });
});

//@des UnBlcok user
//@route POST /api/v1/users/Unblock/:userIdToUnBlock
//@access private

exports.unBLockUser = asynchandler(async (req, res) => {
  // find the user to unblock
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    throw new Error("User to unblock isn't found");
  }

  // find the current user
  const userUnBlocking = req.userAuth._id;
  const currentUser = await User.findById(userUnBlocking);

  // check if the user is blocked before unblocking
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    throw new Error("User isn't Blocked");
  }

  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnBlock.toString()
  );
  // resave the current user
  await currentUser.save();
  res.json({
    status: "Success",
    message: "User Unblocked Successfully",
  });
});

//@des who viewed my profile
//@route POST /api/v1/users/profile_viewer/:userProfileId
//@access private
exports.ProfileViewers = asynchandler(async (req, res) => {
  // find the user to be blocked
  const userProfileId = req.params.userProfileId;

  const userProfile = await User.findById(userProfileId);

  if (!userProfile) {
    throw new Error("user to view  his profile not found");
  }

  // user who is blocking
  const userBlocking = req.userAuth._id;

  // find the current user
  const currentUserId = req.userAuth._id;

  // check if the user is already viewed
  if (userProfile?.profileViewers?.includes(currentUserId)) {
    throw new Error("you have already viewed this profile");
  }
  // push the user to the profile viewers  array of the current user
  userProfile?.profileViewers.push(currentUserId);
  await userProfile.save();

  res.json({
    message: "you have viewed user profile Succesfully",
    status: "successs",
  });
});

//@des Following User
//@route POST /api/v1/users/Following/:userIdToFollow
//@access private

exports.followingUser = asynchandler(async (req, res) => {
  // find the current user
  const currentUserId = req.userAuth._id;
  // the Id of the user to be Followed
  const userIdToFollow = req.params.userIdToFollow;
  // avoid user following him/herself
  if (currentUserId.toString() === userIdToFollow.toString()) {
    throw new Error("you can't follow yourself");
  }
  // push the userIdToFollow into the current user following field
  const currentUserUpdate = await User.findByIdAndUpdate(
    currentUserId,
    {
      $addToSet: { following: userIdToFollow },
    },
    {
      new: true,
    }
  );
  // push the currentuserId into the  user to be followed followers field
  const UserTobeFollowed = await User.findByIdAndUpdate(
    userIdToFollow,
    {
      $addToSet: { followers: currentUserId },
    },
    {
      new: true,
    }
  );
  res.json({
    status: "Success",
    message: "you followed a user succesfully",
  });
});

//@des UnFollowing User
//@route POST /api/v1/users/UnFollowing/:userIdToUnFollow
//@access private

exports.UnfollowingUser = asynchandler(async (req, res) => {
  // find the current user
  const currentUserId = req.userAuth._id;
  // the Id of the user to be Followed
  const userIdToUnFollow = req.params.userIdToUnFollow;
  // avoid user following him/herself
  if (currentUserId.toString() === userIdToUnFollow.toString()) {
    throw new Error("you can't follow yourself");
  }
  // Pull(remove) the userIdToUnFollow into the current user following field
  const currentUserUpdate = await User.findByIdAndUpdate(
    currentUserId,
    {
      $pull: { following: userIdToUnFollow },
    },
    {
      new: true,
    }
  );
  // Remove the currentuserId from the  user to unfollow followers field
  const UserTobeFollowed = await User.findByIdAndUpdate(
    userIdToUnFollow,
    {
      $pull: { followers: currentUserId },
    },
    {
      new: true,
    }
  );
  res.json({
    status: "Success",
    message: "you Unfollowed a user succesfully",
  });
});

//@des forgot password
//@route POST /api/v1/users/forgot-password
//@access public

exports.forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  // find the email in the db
  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw new Error("There's No Such Email in our System");
    // Generate the token
  }
  const resetToken = await userFound.generatePasswordResetToken();

  // resave the user
  await userFound.save();

  // send Email
  sendEmail(email, resetToken);
  res.status(200).json({
    message: "password reset email sent",
    resetToken,
  });
});

//  @desc Reset Password
// @route post /api/v1/users/reset-password/:token
// @access Public
exports.resetPassword = expressAsyncHandler(async (req, res) => {
  // Get the id/token form email/params
  const { resetToken } = req.params;
  const { password } = req.body;
  // convert the token to actual token that has been saved in the DB
  const crypotToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // find the user by the crypto token
  const userFound = await User.findOne({
    passwordResetToken: crypotToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Invalid or expired password reset Token");
  }
  // update the user password
  const salt = await bcrypt.genSalt(10);
  userFound.password = await bcrypt.hash(password, salt);
  // emptying the resetToken and exry date
  userFound.passwordResetToken = undefined;
  userFound.passwordResetExpires = undefined;
  // resave the user
  await userFound.save();
  // return a success response
  res.status(200).json({
    message: "Password reset succesfully",
  });
});

//  @desc  account verification
// @route post /api/v1/users/verify-acc/:token
// @access private
exports.accountVerificationEmail = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req?.userAuth._id);
  if (!user) {
    throw new Error("User not found");
  }
  // send the token
  const token = await user.generateaccountVerificationToken();
  // resave the user
  await user.save();
  // send the email
  SendAccVerificationEmail(user.email, token);
  // return a success response
  res.status(200).json({
    message:
      "A verification mail has been sent to your Email " +
      user.email +
      " Please ,click on the provided link to verify your account ",
  });
});

// @route   POST /api/v1/users/verify-account/:verifyToken
// @desc    Verify token
// @access  Private

exports.verifyAccount = expressAsyncHandler(async (req, res) => {
  //Get the id/token params
  const { verifyToken } = req.params;
  //Convert the token to actual token that has been saved in the db
  const cryptoToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");
  //find the user by the crypto token
  const userFound = await User.findOne({
    accountVerificationToken: cryptoToken,
    accountVerificationExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Account verification  token is invalid or has expired");
  }
  //Update user account
  userFound.isVerified = true;
  userFound.accountVerificationExpires = undefined;
  userFound.accountVerificationToken = undefined;
  //resave the user
  await userFound.save();
  res.status(200).json({ message: "Account  successfully verified" });
});


//@desc  Upload profile image
//@route  PUT /api/v1/users/upload-profile-image
//@access Private

exports.uploadeProfilePicture = asynchandler(async (req, res) => {
  // Find the user
  const userFound = await User.findById(req?.userAuth?._id);
  if (!userFound) {
    throw new Error("User not found");
  }
  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $set: { profilePicture: req?.file?.path },
    },
    {
      new: true,
    }
  );

  //? send the response
  res.json({
    status: "scuccess",
    message: "User profile image updated Succesfully",
    user,
  });
});

//@desc   Upload cover image
//@route  PUT /api/v1/users/upload-cover-image
//@access Private

exports.uploadeCoverImage = asynchandler(async (req, res) => {
  // Find the user
  const userFound = await User.findById(req?.userAuth?._id);

  if (!userFound) {
    throw new Error("User not found");
  }
  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $set: { coverImage: req?.file?.path },
    },
    {
      new: true,
    }
  );

  //? send the response
  res.json({
    status: "scuccess",
    message: "User cover image updated Succesfully",
    user,
  });
});

//@desc   Update username/email
//@route  PUT /api/v1/users/update-profile
//@access Private

exports.updateUserProfile = asynchandler(async (req, res) => {
  //!Check if the post exists
  const userId = req.userAuth?._id;
  const userFound = await User.findById(userId);
  if (!userFound) {
    throw new Error("User not found");
  }
  console.log(userFound);
  //! image update
  const { username, email } = req.body;
  const post = await User.findByIdAndUpdate(
    userId,
    {
      email: email ? email : userFound?.email,
      username: username ? username : userFound?.username,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "User successfully updated",
    post,
  });
});
