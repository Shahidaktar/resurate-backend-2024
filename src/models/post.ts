import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter post content"],
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    user: {
      type: String,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", schema);
