import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Apply } from "../models/apply.js";
import { NewApplyRequestBody } from "../types/types.js";

export const newApply = TryCatch(
  async (req: Request<{}, {}, NewApplyRequestBody>, res, next) => {
    const { user } = req.query;
    const { job, resume, score, phone, location, workExperience } = req.body;

    if (
      !job ||
      !user ||
      !resume ||
      !score ||
      !phone ||
      !location ||
      !workExperience
    )
      return next(new ErrorHandler("Please enter all Fields", 400));

    const existingApply = await Apply.findOne({ user: user as string, job });

    if (existingApply) {
      return next(
        new ErrorHandler("You have already applied for this job.", 400)
      );
    }

    const apply = await Apply.create({
      user,
      job,
      resume,
      score,
      phone,
      location,
      workExperience,
    });

    return res.status(201).json({
      success: true,
      message: "Job Applied Successfully",
    });
  }
);

export const myApplies = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  const data = await Apply.find({ user: id as string })
    .select(["user", "job", "status"])
    .populate("job");

  return res.status(200).json({
    success: true,
    data,
  });
});

export const existingApply = TryCatch(async (req, res, next) => {
  const { user } = req.query;
  const id = req.params.id;
  let status = false;

  if (!id || !user)
    return next(new ErrorHandler("Please enter all Fields", 400));

  const existingApply = await Apply.findOne({ user: user as string, job: id });

  if (existingApply) {
    status = true;
  }

  return res.status(200).json({
    success: true,
    status,
  });
});

export const allApplies = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const data = await Apply.find({ job: id })
    .select(["_id", "user", "status", "score", "job"])
    .populate("user")
    .sort({ score: -1 });
  return res.status(200).json({
    success: true,
    data,
  });
});

export const getSingleApply = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const data = await Apply.findById(id)
    .select(["job", "status"])
    .populate("job");

  if (!data) return next(new ErrorHandler("Applicant Not Found", 404));

  return res.status(200).json({
    success: true,
    data,
  });
});

export const changeStatus = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const apply = await Apply.findById(id);
  if (!apply) return next(new ErrorHandler("Applicant Not Found", 404));

  if (status) apply.status = status;

  await apply.save();

  return res.status(200).json({
    success: true,
    message: "Status Changed Successfully",
  });
});

export const deleteApply = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const apply = await Apply.findById(id);
  if (!apply) return next(new ErrorHandler("Applicant Not Found", 404));
  await apply.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Applicant Deleted Successfully",
  });
});
