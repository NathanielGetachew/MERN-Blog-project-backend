const express = require("express");

const isLoggedin = require("../../middlewares/isLoggedin");
const { createComment,deleteComment,updateComment } = require("../../controllers/comments/commentCtrl");

const commentRouter = express.Router();

// CREATE
commentRouter.post("/:postId", isLoggedin, createComment);

// UPDATE
commentRouter.put("/:id", isLoggedin, updateComment);

// DELETE
commentRouter.delete("/:id", isLoggedin, deleteComment);

// export
module.exports = commentRouter;
