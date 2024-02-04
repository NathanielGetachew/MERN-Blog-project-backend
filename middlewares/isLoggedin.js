const jwt = require("jsonwebtoken");
const isLoggedin = (req, res, next) => {
  console.log(req.headers);
  // Get Token from header
  const token = req.headers.authorization.split(" ")[1];

  // verify token
  jwt.verify(token, "anykey", (err, decoded) => {
    console.log(decoded);
    if (err) {
      return "Invalid token"
    } 
    else {
      return decoded;
    }
  });

  // save the user
  // send the user
  next();
};

module.exports = isLoggedin;
