const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");


//@desc Register a new user
//@route POST /api/v1/users/register
//@access Public

exports.register = async (req, res) => {
  console.log(req.body);
  try {
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
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};

// login a registered user
//@route POST /api/v1/users/login
//@access Public

exports.login = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};

//@des Get profile
//@route POST /api/v1/users/profile/:id
//@access Public

exports.getProfile = async (req, res) => {
   //console.log(req.userAuth);
  console.log(req.params) 
  try {
    const id = req.userAuth._id;
    const user = await User.findById(id)
    console.log(user);
    res.json({
      status: "success",
      message: "Profile fetched",
      user,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: error?.message,
    });
  }
};
