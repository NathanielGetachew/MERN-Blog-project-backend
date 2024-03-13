const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");

//@desc Register a new user
//@route POST /api/v1/users/register
//@access Public

exports.register = asynchandler(async (req, res) => {
  console.log(req.body);

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

    // compare the hashed password with the one the  user entered
    const isMatched = await bcrypt.compare(password, user?.password);
    if (!isMatched) {
      throw new Error("Invalid login Credentials");
    }
  }
  // update the last login

  user.lastLogin = new Date();
  res.json({
    status: "Success",
    username: user?.username,
    email: user?.email,
    _id: user?._id,
    role: user?.role,
    token: generateToken(user),
  });
});

//@des Get profile
//@route POST /api/v1/users/profile/:id
//@access Public

exports.getProfile = asynchandler(async (req, res, next) => {
  // trigger custom error

  const id = req.userAuth._id;
  const user = await User.findById(id);
  res.json({
    status: "success",
    message: "Profile fetched",
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

exports.followingUser = asynchandler(async(req,res)=>{
  // find the current user
  const currentUserId = req.userAuth._id;
  // the Id of the user to be Followed
  const  userIdToFollow = req.params.userIdToFollow;
  // avoid user following him/herself
  if(currentUserId.toString()===userIdToFollow.toString()){
    throw new Error("you can't follow yourself");
  }
  // push the userIdToFollow into the current user following field
  const currentUserUpdate = await User.findByIdAndUpdate(currentUserId,{
    $addToSet:{following : userIdToFollow},
     },
     {
      new: true,
    }
     );
  // push the currentuserId into the  user to be followed followers field
  const UserTobeFollowed = await User.findByIdAndUpdate(userIdToFollow,{
    $addToSet:{followers : currentUserId}
  },
  {
    new: true,
  }
  );
  res.json({
    status:"Success",
    message: "you followed a user succesfully"

  })

})

//@des UnFollowing User
//@route POST /api/v1/users/UnFollowing/:userIdToUnFollow
//@access private

exports.UnfollowingUser = asynchandler(async(req,res)=>{
  // find the current user
  const currentUserId = req.userAuth._id;
  // the Id of the user to be Followed
  const  userIdToUnFollow = req.params.userIdToUnFollow;
  // avoid user following him/herself
  if(currentUserId.toString()===userIdToUnFollow.toString()){
    throw new Error("you can't follow yourself");
  }
  // Pull(remove) the userIdToUnFollow into the current user following field
  const currentUserUpdate = await User.findByIdAndUpdate(currentUserId,{
    $pull:{following : userIdToUnFollow},
     },
     {
      new: true,
    }
     );
  // Remove the currentuserId from the  user to unfollow followers field
  const UserTobeFollowed = await User.findByIdAndUpdate(userIdToUnFollow,{
    $pull:{followers : currentUserId}
  },
  {
    new: true,
  }
  );
  res.json({
    status:"Success",
    message: "you Unfollowed a user succesfully"

  })

})




