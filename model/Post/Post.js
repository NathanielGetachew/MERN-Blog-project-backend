const mongoose = require
("mongoose")
const postSchema =  new mongoose.Schema({

title: {
    type: String,
    required: true,
},
image: {
    type: String,
    default:"",
},
claps: {
    type: Number,
    required: true,
    default:0,
},
content: {
    type: String,
    required: true,
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
},
shares: {
    type: Number,
    default:0,
},
postViews: {
    type: Number,
    default:0,
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Categories"
},
likes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
],
dislikes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
],
likes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
    }
],

},
{
timestamps: true,
}
 
);
// compile schema to model

const Post = mongoose.model("Post",postSchema);
module.exports = Post;
