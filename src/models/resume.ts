import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    singleresume: {
        type: String,
        required: [true, "Please add resume"],
      }
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", schema);
