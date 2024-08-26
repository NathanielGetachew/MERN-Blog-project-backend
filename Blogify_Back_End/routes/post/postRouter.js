const express = require("express");
const multer = require("multer");

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
  schedule,
  getPublicPosts,
} = require("../../controllers/post/postCtrl");
const checkAccVerification = require("../../middlewares/isAccVerified");
const storage = require("../../utils/fileUpload");


const postRouter = express.Router();
// file upload middleware
const upload = multer({ storage });

// create
postRouter.post("/",isLoggedin, upload.single("file"), createPost);

// get
postRouter.get("/:id", getPost);

//  get all
postRouter.get("/", isLoggedin, getPosts);

// get public posts
 postRouter.get("/home/public", getPublicPosts);
 
 

// delete
postRouter.delete("/:id", isLoggedin, deletePost);

// update
postRouter.put("/:id", isLoggedin,pload.single("file"), updatePost);
// Like post
postRouter.put("/likes/:id", isLoggedin, likePost);

//Dislike post
postRouter.put("/dislikes/:id", isLoggedin, dislikePost);
//clap  post
postRouter.put("/claps/:id", isLoggedin, claps);

//schedule  post
postRouter.put("/schedule/:id", isLoggedin, schedule);

module.exports = postRouter;
