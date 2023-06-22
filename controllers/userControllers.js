import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//@desc Register new user
//@route POST api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  // check if all fields were provided
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // check if user with that email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with that email already exists!");
  }

  // hash password before storing in db
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("User data not valid");
  }

  res.status(201).json({ _id: user.id, email: user.email });
});

//@desc Login user
//@route POST api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  // check if all fields were provided
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // check if user with that email already exists
  const user = await User.findOne({ email });
  // compare passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    let accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1 hour" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Get current logged in user
//@route GET api/users/user-profile
//@access private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

export { registerUser, loginUser, getUser };
