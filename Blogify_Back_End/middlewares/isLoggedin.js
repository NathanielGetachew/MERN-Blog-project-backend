const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLoggedin = (req, res, next) => {
  // generate token from the header
  const token = req.headers.authorization?.split(" ")[1];

  // verify the token
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    // add the user to the req object
    // get the user id
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).maxTimeMS(30000).select("username  email role _id"); // Increase timeout to 30 seconds
    // save the user into the req obj
    req.userAuth = user;

    next();

    if (err) {
      const err = new Error("Token expired/Invalid")
      next(err);
    } else {
    }
  });

  // send the user
};

module.exports = isLoggedin;
