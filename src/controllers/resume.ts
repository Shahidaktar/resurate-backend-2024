import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewResumeRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { Resume } from "../models/resume.js";

export const newResume = TryCatch(
  async (
    req: Request<{}, {}, NewResumeRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { user,job} = req.body;
    const singleresume = req.file;

    if (!singleresume) return next(new ErrorHandler("Please add Resume", 400));

    if (!user || !job) {
      rm(singleresume.path, () => console.log("deleted"));
      return next(new ErrorHandler("Please add all fields", 400));
    }
    
    const resume = await Resume.create({
      user,
      singleresume: singleresume.path,
      job
    });
    return res.status(201).json({
      success: true,
      message: "Resume uploaded Successfully",
      job,
      resume,
    });
  }
);

export const getResume = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const resume = await Resume.find({user:id});
  if (!resume) return next(new ErrorHandler("User not Found", 400));
  return res.status(200).json({
    success: true,
    resume,
  });
});
