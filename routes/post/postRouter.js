const express = require("express");

const isLoggedin = require("../../middlewares/isLoggedin");
const {createPost, getPosts, getPost, deletePost, updatePost} = require("../../controllers/post/postCtrl");

const  postRouter  = express.Router();

// create
postRouter.post("/", isLoggedin, createPost);

// get
postRouter.get("/:id",getPost);

//  get all
postRouter.get("/",getPosts);

// delete
postRouter.delete("/:id",isLoggedin,deletePost);


// update
postRouter.put("/:id",isLoggedin,updatePost );

module.exports = postRouter;