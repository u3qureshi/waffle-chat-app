// This code is part of the backend of a web application, specifically defining the user model using Mongoose.
// This code defines a Mongoose schema for a User model in a Node.js application.
// This model defines the structure of the User document in MongoDB.
// It includes fields for username, email, full name, password, and profile picture.
// The schema enforces validation rules such as required fields, unique constraints, and string lengths.
// The password field is excluded from queries by default for security reasons.
// The timestamps option automatically adds createdAt and updatedAt fields to the document.
// The User model can be used to interact with the users collection in the MongoDB database.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Regex for basic email validation
  },
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
    },
  profilePicture: {
    type: String,
    default: "", // Default profile picture URL
  },
},
  {timestamps: true} // Automatically manage createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);
export default User;