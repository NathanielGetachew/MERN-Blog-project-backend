const express = require("express");
const { createCategory, getCategories, deleteCategories, updateCategories } = require("../../controllers/categories/categoryCtrl");
const isLoggedin = require("../../middlewares/isLoggedin");


const categoryRouter = express.Router();

// create
categoryRouter.post("/",isLoggedin, createCategory);

//  all 
categoryRouter.get("/",getCategories);

// Delete
categoryRouter.delete("/:id",isLoggedin,deleteCategories );

// update
categoryRouter.put("/:id",isLoggedin, updateCategories);

// export
module.exports = categoryRouter;
