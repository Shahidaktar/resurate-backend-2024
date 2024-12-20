import mongoose from "mongoose";
import validator from "validator";



const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Name"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    
    role: {
      type: String,
      enum: ["admin", "user","recruiter"],
      required: [true, "Please enter Role"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of Birth"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schema);
