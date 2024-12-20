import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Please login First", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not Found", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("Only admin can Access", 401));

  next();
});

export const recruiterOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Please login First", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not Found", 401));

  if (user.role !== "recruiter" && user.role !== "admin")
    return next(new ErrorHandler("Only recruiters and admins can access", 401));

  next();
});
