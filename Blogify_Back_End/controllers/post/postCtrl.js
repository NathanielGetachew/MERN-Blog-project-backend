const asynchandler = require("express-async-handler");
const Category = require("../../model/Categories/Category");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const expressAsyncHandler = require("express-async-handler");
const { post } = require("../../routes/post/postRouter");
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
  // check if the user account is verified

  // create the post

  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
    image: req?.file?.path,
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

// // @desc Get all posts
// // @route GET /api/v1/posts
// // @access private
exports.getPosts = asynchandler(async (req, res) => {
  // find all the users who have blocked the logged-in user
  const loggedUserId = req.userAuth?._id;
  const currentTime = new Date();
  const usersBlokingLoggedInUser = await User.find({
    blockedUsers: loggedUserId,
  });

  // extract the ids of the user who have blocked the login user
  const blockedUserIds = usersBlokingLoggedInUser?.map((user) => user._id);
  const query = {
    author: { $nin: blockedUserIds },
    $or: [
      { scheduledPublished: { $lte: currentTime }, scheduledPublished: null },
    ],
  };

  const posts = await Post.find(query).populate({
    path: "author",
    model: "User",
    select: "email role username",
  });

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
  const post = await Post.findById(req.params.id).populate("author").populate("category");
  res.status(201).json({
    status: "success",
    message: "Posts Fetched Successfuly",
    post,
  });
});

// @desc Get only 4 post
// @route GET /api/v1/posts/public
// @access Public

exports.getPublicPosts = asynchandler(async (req, res) => {
  const posts = await Post.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");

  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});

exports.deletePost = asynchandler(async (req, res) => {
  //! find the post
  const postFound = await Post.findById(req.params.id);
  const IsAuthor = req.userAuth?._id.toString() === postFound?.author?._id.toString();
  if(!IsAuthor){
     throw new Error("Action denied, you are not the creator of this post") 
  }

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
  //!Check if the post exists
  const { id } = req.params;
  const postFound = await Post.findById(id);
  if (!postFound) {
    throw new Error("Post not found");
  }
  //! image update
  const { title, category, content } = req.body;
  const post = await Post.findByIdAndUpdate(
    id,
    {
      image: req?.file?.path ? req?.file?.path : postFound?.image,
      title: title ? title : postFound?.title,
      category: category ? category : postFound?.category,
      content: content ? content : postFound?.content,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "post successfully updated",
    post,
  });
});

// desc liking a  post
// route PUT api/v1/post/Likes/:id
//@ access private

exports.likePost = expressAsyncHandler(async (req, res) => {
  // Get the id of the post
  const { id } = req.params;
  // get the login user
  const userId = req.userAuth._id;
  // find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found!");
  }
  // // check if the user has already liked the post
  
  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: userId },
    },
    { new: true }
  );
  // remove the user from the dislikes  array if present
  post.dislikes = post.dislikes.filter(
    (dislike) => dislike.toString() !== userId.toString()
  );
  await post.save();
  res.status(200).json({
    message: "Post liked succesfully",
  });
});

// desc post view count 
// route PUT api/v1/posts/:id/post-views-count
//@ access private

exports.postViewCount = expressAsyncHandler(async (req, res) => {
  // Get the id of the post
  const { id } = req.params;
  // get the login user
  const userId = req.userAuth._id;
  // find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found!");
  }
  // // check if the user has already liked the post
  
  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { postViews: userId },
    },
    { new: true }
  );
 
  
  await post.save();
  res.status(200).json({
    message: "Post viewed succesfully",
  });
});


// desc disliking a  post
// route PUT api/v1/post/dislikes/:id
//@ access private

exports.dislikePost = expressAsyncHandler(async (req, res) => {
  // Get the id of the post
  const { id } = req.params;
  // get the login user
  const userId = req.userAuth._id;
  // find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found!");
  }
   await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { dislikes: userId },
    },
    { new: true }
  );
  // remove the user from the likes  array if present
  post.likes = post.likes.filter(
    (like) => like.toString() !== userId.toString()
  );
  // resave the post
  await post.save();
  res.status(200).json({
    message: "Post disliked succesfully",
  });
});

// desc clapping a  post
// route PUT api/v1/post/claps/:id
//@ access private

exports.claps = expressAsyncHandler(async (req, res) => {
  // ge the id of the post
  const { id } = req.params;
  // find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("post not found!");
  }
  // implement the claps
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { claps: 1 },
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "The post was clapped successfully",
    updatedPost,
  });
});

// desc scheduling a  post
// route PUT api/v1/post/schedule/:id
//@ access private
exports.schedule = expressAsyncHandler(async (req, res) => {
  // get the payload
  const { scheduledPublish } = req.body;
  const { id } = req.params;
  if (!id) {
    throw new Error("post Id and schedule date are required");
  }
  // find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("post not found");
  }
  // check if th user is the author of the post
  if (post.author.toString() !== req.userAuth._id.toString()) {
    throw new Error("You can only schedule your own post");
  }
  // check if the schedulepulbish date is in the past
  const scheduleDate = new Date(scheduledPublish);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    throw new Error("the scheduled pulbish date can't be in the past");
  }
  // update the Post
  post.scheduledPublished = scheduledPublish;
  await post.save();
  res.status(200).json({ message: "Post scheduled Succesfully", post });
});

// desc scheduling a  post
// route PUT api/v1/post/schedule/:id
//@ access private

