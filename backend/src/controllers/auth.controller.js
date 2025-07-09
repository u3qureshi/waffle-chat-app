import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  // Handle user signup logic here
  const { fullName, username, email, password } = req.body;
  try {
    // Validate user input and ensure all fields are provided
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // Validate password format
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        });
    }
    // Validate username length
    if (username.length < 3 || username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 20 characters long" });
    }
    // Validate full name length
    if (fullName.length < 3 || fullName.length > 50) {
      return res
        .status(400)
        .json({
          message: "Full name must be between 3 and 50 characters long",
        });
    }
    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res
        .status(400)
        .json({
          message:
            "Username can only contain letters, numbers, and underscores",
        });
    }
    //Validate full name format
    if (!/^[a-zA-Z0-9_ ]+$/.test(fullName)) {
      return res
        .status(400)
        .json({
          message:
            "Full name can only contain letters, numbers, spaces and underscores",
        });
    }
    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // hash passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture || "",
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ message: "Invalid user data to create user" });
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  // Handle user login logic here
  const { emailOrUsername, password } = req.body;

  // Validate user input and ensure email and password are provided
  if (!emailOrUsername || !password) {
    return res
      .status(400)
      .json({ message: "Email/username and password are required" });
  }

  try {
    // *** Remember that username can be either email or username ***
    // Check if the user exists in the database by either username or email
    const user = await User.findOne({
      $or: [
        { username: emailOrUsername }, // Check by username
        { email: emailOrUsername }, // Check by email
      ],
    });

    // If no user is found, return an error response
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If the user is found, compare the password
    // Using bcrypt to compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password is invalid, return an error response
      return res
        .status(400)
        .json({ message: "Invalid email/username or password" });
    }
    // If the password is valid, generate a JWT token
    generateToken(user._id, res);
    res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    profilePicture: user.profilePicture || "",
    createdAt: user.createdAt
});
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  // Handle user logout logic here
  try {
    res.cookie("jwt", "", {
      maxAge: 0, // Set cookie expiration to 0 to delete it
      httpOnly: true, // Prevents XSS client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Helps prevent CSRF attacks
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id; // Get the user ID from the authenticated user. User id parameter was added to the request object by the protectRoute middleware

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url }, // Update the profilePic field with the uploaded image URL
      { new: true } // Return the updated user document (after the update)
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  // This controller checks if the user is authenticated
  // It is used to verify if the user is logged in or not
  // The protectRoute middleware will ensure that only authenticated users can access this route
  try {
    res.status(200).json(req.user); // If the user is authenticated, return the user object
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
