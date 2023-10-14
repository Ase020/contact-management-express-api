import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

// Register a user
// route POST '/api/users/register'
// access public
const registerUser = asyncHandler(async (req, res) => {
  // user
  const { username, email, password } = req.body;

  //   check if username, email, password exist
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  //   Check if user already exists
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //   Create a Hashed password
  const hashedPassowrd = await bcrypt.hash(password, 10);

  // Create a User
  const user = await User.create({ username, email, password: hashedPassowrd });
  console.log(`User created: ${user}`);

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }

  res.json({ message: "Register the user!" });
});

// Login a user
// route POST '/api/users/login'
// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password required!");
  }

  //Search for a User
  const user = await User.findOne({ email });

  //   compare password with the hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    // provide an access token
    const accessToken = jwt.sign(
      {
        user: { id: user.id, username: user.username, email: user.email },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid!");
  }
});

// Get a user
// route GET '/api/users/current'
// access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
