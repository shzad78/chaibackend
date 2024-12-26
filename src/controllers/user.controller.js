import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password, avatar, coverImage } = req.body;
  console.log("email: ", email);

  if (
    [fullName, email, username, password, avatar, coverImage].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  console.log("avatar: ", avatarLocalPath);
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  console.log("coverImage: ", coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar and cover image are required");
  }

  const avatarCloudinary = await uploadOnCloudinary(avatarLocalPath);
  const coverImageCloudinary = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatarCloudinary || !coverImageCloudinary) {
    throw new ApiError(500, "Error uploading images");
  }
  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatarCloudinary.url,
    coverImage: coverImageCloudinary.url || "",
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Error creating user");
  }
  console.log("createdUser: ", createdUser);

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User created successfully"));
});

//

export { registerUser };
