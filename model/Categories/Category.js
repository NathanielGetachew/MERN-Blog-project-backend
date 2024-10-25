const mongoose = require
("mongoose")
const categorySchema =  new mongoose.Schema({

name: {
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

likes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
],

posts: 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
    },

},
{
timestamps: true,
toJSON:{
    virtuals:true,
  },
  toObject:{
    virtuals:true,
  }

}
 
);
// compile schema to model

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;
