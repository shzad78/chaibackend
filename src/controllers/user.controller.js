import asyncHandler from '../utils/aysncHandler.js';
import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
};
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("email:", email)
  //const user = await User.create({ name, email, password });
  res.status(201).json({ user:"user registereeeeed"  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  res.status(200).json({ user });
});
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});
