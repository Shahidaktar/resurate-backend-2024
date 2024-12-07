import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter your comment"],
    },
    user: {
      type: String,
      ref: "User",
      required: [true, "User ID is required"],
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", schema);