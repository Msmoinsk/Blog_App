import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
    minlength: 6
  },
  blogs: [
    {
      type : mongoose.Types.ObjectId, 
      ref:"Blog", 
      required:true
    }
  ]
})
export default mongoose.model("User", userSchema)
/**
 * When you import User (import User from '../modals/User.js';), 
 * you are importing the Mongoose model named 'User' that represents your MongoDB collection.
 * 
 * User.find() works directly because User is already the model created by Mongoose. 
 * Internally, Mongoose uses the userSchema you defined to handle operations like find(), findOne(), etc. 
 * You don't need to explicitly reference userSchema again in your application code.
 */