const asyncHandler = require("express-async-handler");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");

// Create a comment
exports.createComment = asyncHandler(async (req, res) => {
  const { message, author } = req.body;
  const postId = req.params.postId;
  // Validate if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
    });
  }

  // Create the comment
  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    postId,
  });

  // Associate the comment to the post
  await Post.findByIdAndUpdate(
    postId,
  
    {
      $push: { comments: comment._id },
    },
    {
      new: true,
    }
  );
  
  res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});

// desc delete  comment
// route PUT api/v1/comment/:id
//@ access private


exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Comment Deleted  Successfully",
  });
});

// desc Update  post
// route PUT api/v1/post
//@ access private

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    
    {
      message: req.body.message,
    },

    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "Success",
    message: "Comment Updated  Successfully",
    comment
  });
});

