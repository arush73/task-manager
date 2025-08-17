import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import bcrypt from 'bcryptjs'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'None',
  strict: false,
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body

  const existingUser = await User.find({
    $or: {
      username,
      email,
    },
  })

  if (existingUser)
    throw new ApiError(401, 'user with same username or email already exists')

  const hashPassword = await bcrypt.hash(password, 10)

  const registerUser = await User.create({
    fullName: name,
    username: username,
    email: email,
    pasword: hashPassword,
  })

  if (!registerUser) throw new ApiError(500, 'failed to register the user')

  const accessToken = registerUser.generateAccessToken()
  const refreshToken = registerUser.generateRefreshToken()

  return res
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .status(201)
    .json(new ApiResponse(201, registerUser, 'user registered successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const findUser = await User.findOne({
    username,
  })

  if (!findUser) throw new ApiError(400, 'no user with the username exists')

  const isPasswordCorrect = findUser.isPasswordCorrect(password)

  if (!isPasswordCorrect) throw new ApiError(401, 'incorrect credentials')

  const accessToken = findUser.generateAccessToken()
  const refreshToken = findUser.generateRefreshToken()

  return res
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .status(201)
    .json(new ApiResponse(201, registerUser, 'user registered successfully'))
})

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(201)
    .json(new ApiResponse(201, {}, 'user logged out successfully'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookie

  if (!refreshToken)
    throw new ApiError(401, 'no refreshToken is there in the req')

  const user = await User.findById(req.user._id)

  const accessToken = user.generateAccessToken()

  return res
    .cookie('accessToken', accessToken)
    .status(201)
    .json(201, 'access token refreshed successfully')
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await User.findById(req.user._id)

  const isPasswordCorrect = user.isPasswordCorrect(oldPassword)
  if (!isPasswordCorrect) throw new ApiError(401, 'password is incorrect')

  const hashPassword = await bcrypt.hash(newPassword, 10)

  const updatePassword = await User.findByIdAndUpdate(req.user._id, {
    password: hashPassword,
  })

  if (!updatePassword)
    throw new ApiError(500, 'Something went wrong while updating the password')

  return res
    .status(200)
    .json(new ApiResponse(201, {}, 'password changed successfully'))
})

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

    return res 
    .status(201)
    .json(new ApiResponse(201,user ,"User fetched successfully"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
}
