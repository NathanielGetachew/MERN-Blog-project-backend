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
  //! Find the user/chec if user account is verified
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("User Not found");
  }
  if (!userFound?.isVerified) {
    throw new Error("Action denied, your account is not verified");
  }
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
  //! get category, serachkeyword from the request
  const category = req.query.category;
  const searchTerm = req.query.searchTerm;

  let query = {
    author: { $nin: blockedUserIds },
    $or: [
      {
        sheduledPublished: { $lte: currentTime },
        sheduledPublished: null,
      },
    ],
  };
  //! check if category/searchterm is specified, then add to the query
  if (category) {
    query.category = category;
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }
  // pagination parameter from the request
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startingIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "email role username",
    })
    .populate("category")
    .skip(startingIndex)
    .limit(limit);
  // pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startingIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(201).json({
    status: "success",
    message: "Posts Fetched Successfuly",
    pagination,
    posts,
  });
});

// @desc Get a single post
// @route GET /api/v1/posts:id
// @access Public
exports.getPost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });
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
  const IsAuthor =
    req.userAuth?._id.toString() === postFound?.author?._id.toString();
  if (!IsAuthor) {
    throw new Error("Action denied, you are not the creator of this post");
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
  ).populate("author");

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

///@desc   Shedule a post
//@route  PUT /api/v1/posts/schedule/:postId
//@access Private

exports.schedule = expressAsyncHandler(async (req, res) => {
  //get the payload
  const { sheduledPublished } = req.body;
  const { postId } = req.params;
  //check if postid and scheduledpublished found
  if (!postId || !sheduledPublished) {
    throw new Error("PostID and schedule date are required");
  }
  //Find the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found...");
  }
  //check if tjhe user is the author of the post
  if (post.author.toString() !== req.userAuth._id.toString()) {
    throw new Error("You can schedulle your own post ");
  }
  // Check if the scheduledPublish date is in the past
  const scheduleDate = new Date(sheduledPublished);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    throw new Error("The scheduled publish date cannot be in the past.");
  }
  //update the post
  post.sheduledPublished = sheduledPublished;
  await post.save();
  res.json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});

// desc scheduling a  post
// route PUT api/v1/post/schedule/:id
//@ access private
