const express = require("express");

const isLoggedin = require("../../middlewares/isLoggedin");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
  claps,
  schedule
} = require("../../controllers/post/postCtrl");
const checkAccVerification = require("../../middlewares/isAccVerified");

const postRouter = express.Router();

// create
postRouter.post("/", isLoggedin, checkAccVerification, createPost);

// get
postRouter.get("/:id", getPost);

//  get all
postRouter.get("/", isLoggedin,getPosts);

// delete
postRouter.delete("/:id", isLoggedin, deletePost);

// update
postRouter.put("/:id", isLoggedin, updatePost);
// Like post
postRouter.put("/likes/:id", isLoggedin, likePost);

//Dislike post
postRouter.put("/dislikes/:id", isLoggedin, dislikePost);
//clap  post
postRouter.put("/claps/:id", isLoggedin, claps);

//schedule  post
postRouter.put("/schedule/:id", isLoggedin, schedule);

module.exports = postRouter;
