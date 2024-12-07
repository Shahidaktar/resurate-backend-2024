import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    resume: {
      type: String,
      ref: "Resume",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    workExperience: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Selected", "Rejected"],
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
