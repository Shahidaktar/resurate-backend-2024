import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import {
  BaseQuery,
  NewJobRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Job } from "../models/job.js";

export const newJob = TryCatch(
  async (req: Request<{}, {}, NewJobRequestBody>, res, next) => {
    const { id} = req.query;
    const {
      name,
      company,
      jobSummary,
      responsibities,
      skils,
      jobType,
      location,
      openings,
      pay,
      experience,
      status
    } = req.body;

    if (
      !name ||
      !company ||
      !jobSummary ||
      !responsibities ||
      !skils ||
      !status ||
      !jobType ||
      !location ||
      !openings ||
      !pay ||
      !experience ||
      !id
    ) {
      return next(new ErrorHandler("Please enter all Fields", 400));
    }
    await Job.create({
      name,
      company,
      jobSummary,
      responsibities,
      skils,
      status,
      jobType,
      location,
      openings,
      pay,
      experience,
      user: id
    });

    return res.status(201).json({
      success: true,
      message: "Job created Successfully",
    });
  }
);

export const getAdminJobs = TryCatch(async (req, res, next) => {
  
  const data = await Job.find({}).populate("user");
  return res.status(200).json({
    success: true,
    data,
  });
});

export const getRecruiterJobs = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  const data = await Job.find({user:id as string});
  return res.status(200).json({
    success: true,
    data,
  });
});

export const getAllJobs = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, jobType, location, experience, status } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 6;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (jobType) baseQuery.jobType = jobType;

    if (location) baseQuery.location = location;

    if (experience) baseQuery.experience = experience;

    if (status) baseQuery.status = status;

    const jobPromise = Job.find(baseQuery).limit(limit).skip(skip);

    const [jobs, filteredOnlyJob] = await Promise.all([
      jobPromise,
      Job.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyJob.length / limit);

    return res.status(200).json({
      success: true,
      jobs,
      totalPage,
    });
  }
);

export const getSingleJob = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const data = await Job.findById(id);
  if (!data) return next(new ErrorHandler("Job not Found", 404));
  return res.status(200).json({
    success: true,
    data,
  });
});

export const updateJob = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    company,
    jobSummary,
    responsibities,
    skils,
    status,
    jobType,
    location,
    openings,
    pay,
    experience,
  } = req.body;

  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("Job not Found", 404));

  if (name) job.name = name;
  if (company) job.company = company;
  if (jobSummary) job.jobSummary = jobSummary;
  if (responsibities) job.responsibities = responsibities;
  if (skils) job.skils = skils;
  if (status) job.status = status;
  if (jobType) job.jobType = jobType;
  if (location) job.location = location;
  if (openings) job.openings = openings;
  if (pay) job.pay = pay;
  if (experience) job.experience = experience;

  await job.save();

  return res.status(200).json({
    success: true,
    message: "Job updated Successfully",
  });
});

export const deleteJob = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("Job not Found", 404));

  await job.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Job deleted Successfully",
  });
});
