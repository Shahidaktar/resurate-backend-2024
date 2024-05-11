import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Selected", "Not Selected"],
      default: "Pending",
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

export const Apply = mongoose.model("Apply", schema);
