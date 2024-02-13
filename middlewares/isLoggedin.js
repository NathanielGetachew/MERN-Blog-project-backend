const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLoggedin = (req, res, next) => {
  // generate token from the header
  const token = req.headers.authorization?.split(" ")[1];

  // verify the token
  jwt.verify(token, "anykey", async (err, decoded) => {
    // add the user to the req object
    // get the user id
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).maxTimeMS(30000).select("username email role _id"); // Increase timeout to 30 seconds
    // save the user into the req obj
    req.userAuth = user;

    next();

    if (err) {
      return "Ivalid Token";
    } else {
    }
  });

  // send the user
};

module.exports = isLoggedin;
