const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
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
      type: Boolean,
      default: false,
    },
    accountLevel: {
      type: String,
      enum: ["bronze", "silver", "gold"],
      default: "bronze",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    notificationPrefernces: {
      email: { type: String, default: true },
      //.. other notifications like sms
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },

    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationExpires: {
      type: Date,
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

// Generate password reset token

userSchema.methods.generateaccountVerificationToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // assign the token to the accountVerificationToken field
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // update the accountVerification field and and when it expires
  this.accountVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetToken;
};

 

// compile schema to model

const User = mongoose.model("User", userSchema);
module.exports = User;
