const asynchandler = require("express-async-handler");
const Category = require("../../model/Categories/Category");

// desc Creat a category
// route Post api/v1/categories
//@ access Private

exports.createCategory = asynchandler(async (req, res) => {
  const { name, author } = req.body;
  // if exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: name,
    author: req.userAuth?._id,
  });
  res.status(201).json({
    status: "Success",
    message: "Category created Successfully",
    category,
  });
});
// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asynchandler(async (req, res) => {
  const categories = await Category.find({}).populate({
    path:"posts",
    model:"Post",

  });
  res.status(201).json({
    status: "success",
    message: "Categories Fetched Successfuly",
    categories,
  });
});

// desc delete  categories
// route Delete api/v1/categories
//@ access private

exports.deleteCategories = asynchandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Categories Deleted  Successfully",
  });
});

// desc Update  categories
// route PUT api/v1/categories
//@ access private

exports.updateCategories = asynchandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "Success",
    message: "Categories Updated  Successfully",
    category,
  });
});
