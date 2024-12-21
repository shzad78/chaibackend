import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
};
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ user });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  res.status(200).json({ user });
});
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});
