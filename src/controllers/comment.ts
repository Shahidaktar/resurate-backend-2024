import { Comment } from "../models/comment.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import { Job } from "../models/job.js";

export const newComment = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  const { jobId, content } = req.body;

  if (!id) return next(new ErrorHandler("Please login first", 401));
  if (!content) return next(new ErrorHandler("Please enter a comment", 400));
  if (!jobId) return next(new ErrorHandler("Job ID is required", 400));

  const job = await Job.findById(jobId);
  if (!job) return next(new ErrorHandler("Job not found", 404));

  await Comment.create({
    content,
    user: id,
    job: jobId,
  });

  return res.status(201).json({
    success: true,
    message: "Comment added successfully",
  });
});

export const getJobComments = TryCatch(async (req, res, next) => {
  const { jobId } = req.params;

  const comments = await Comment.find({ job: jobId })
    .populate("user")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    comments,
  });
});


export const deleteComment = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  const { commentId } = req.params;

  if (!id) return next(new ErrorHandler("Please login first", 401));

  const comment = await Comment.findById(commentId);
  if (!comment) return next(new ErrorHandler("Comment not found", 404));

  if (comment.user.toString() !== id.toString()) {
    return next(new ErrorHandler("Unauthorized to delete this comment", 403));
  }

  await comment.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});