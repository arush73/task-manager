import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MONGODB connected successfully')
  } catch (error) {
    console.error('MONGOSB connection failed: ' + error)
    process.exit(1)
  }
}

export default connectDB
