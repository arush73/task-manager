import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: 'https://palcehold.co/600x400',
        localPath: '',
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}
userSchema.methods.generateRefreshToken = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString('hex')

  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex')

  const tokenExpiry = Date.now() + 20 * 60 * 1000

  return { hashedToken, unHashedToken, tokenExpiry }
}

export const User = mongoose.model('User', userSchema)
