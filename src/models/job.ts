import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Job Name"],
    },
    company: {
      type: String,
      required: [true, "Please enter Company Name"],
    },
    jobSummary: {
      type: String,
      required: [true, "Please enter job Summary"],
    },
    responsibities: {
      type: String,
      required: [true, "Please enter responsibities"],
    },
    skils: {
      type: String,
      required: [true, "Please enter skils"],
    },
    status: {
      type: String,
      enum: ["open", "close"],
      default: "open",
    },
    pay: {
      type: String,
      required: [true, "Please enter Salary"],
    },
    experience: {
      type: String,
      required: [true, "Please enter experience"],
    },
    jobType: {
      type: String,
      required: [true, "Please enter Job Type"],
    },
    location: {
      type: String,
      required: [true, "Please enter Location"],
    },
    openings: {
      type: Number,
      required: [true, "Please enter Openings"],
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", schema);
