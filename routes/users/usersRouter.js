const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersCtrl.js");
isLoggedin = require("../../middlewares/isLoggedin.js")


const usersRouter = express.Router();

// Register
usersRouter.post("/register", register);

// login
usersRouter.post("/login", login);

// Profile
usersRouter.get("/profile/",isLoggedin, getProfile);



// export
module.exports = usersRouter;
