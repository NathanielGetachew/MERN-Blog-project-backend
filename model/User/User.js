const mongoose = require
("mongoose")
const userSchema =  new mongoose.Schema({

username: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
username: {
    type: String,
    required: true,
},
role: {
    type: String,
    required: true,
    enum:["user","admin"],
    default: "user" ,
},
password: {
    type: String,
    required: true,
},
lastLogin: {
    type: String,
    default: Date.now(),
},
isVerified: {
    type: String,
    default: false
},
accountLevel: {
    type: String,
    enum:["bronze","silver","gold"],
    default:"bronze" 
},
profilePicture: {
    type: String,
    default:"", 
},
coverImage: {
    type: String,
    default:"", 
},
bio: {
    type: String,
},
location: {
    type: String,
},
notificationPrefernces: {
    email: {type: String, default: true},
    //.. other notifications like sms
},
gender: {
    type: String,
    enum:["male","female"],
},


profileViewers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
followers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
blockedUsers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
posts:[{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
likedPosts:[{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
passwordResetToken: {
    type:string
},
passwordResetExpires: {
    type:Date,
},
accountVerificationToken: {
    type:string,
},
accountVerificationExpires: {
    type:Date,
},

},
{
timestamps: true,
}
 
);
// compile schema to model

const User = mongoose.model("User",userSchema);
module.exports = User;
