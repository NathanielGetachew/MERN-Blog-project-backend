const asynchandler = require("express-async-handler");
const Category = require("../../model/Categories/Category");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
//@desc Create a post
// @route Post /api/v1/posts
//@access private

exports.createPost = asynchandler(async (req, res) => {
  // Get the payload
  const { title, content, categoryId } = req.body;
  // check if pos already exists
  const postFound = await Post.findOne({ title });
  if (postFound) {
    throw new Error("Post already exists");
  }
  // create the post

  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });

  // Associate a post to a user
  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    { $push: { posts: post._id } },
    { new: true }
  );
  // push post into category
  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    { $push: { posts: post._id } },
    { new: true }
  );

  // send the response
  res.json({ status: "Success", message: "Post Created Successfully", post });
});

// @desc Get all posts
// @route GET /api/v1/posts
// @access Public
exports.getPosts = asynchandler(async (req, res) => {
  const posts = await Post.find({}).populate("comments");

  res.status(201).json({
    status: "success",
    message: "Posts Fetched Successfuly",
    posts,
  });
});

// @desc Get a single post
// @route GET /api/v1/posts:id
// @access Public
exports.getPost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Posts Fetched Successfuly",
    post,
  });
});

exports.deletePost = asynchandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "post Deleted  Successfully",
  });
});

// desc Update  post
// route PUT api/v1/post
//@ access private

exports.updatePost = asynchandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "Success",
    message: "Post Updated  Successfully",
    post,
  });
});
