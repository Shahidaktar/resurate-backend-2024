import express from "express";
import { deleteJob, getAdminJobs, getAllJobs, getRecruiterJobs, getSingleJob, newJob, updateJob } from "../controllers/job.js";
import { adminOnly, recruiterOnly } from "../middlewares/auth.js";



const app = express.Router();

app.post("/new",recruiterOnly,newJob);

app.get("/all", getAllJobs);

app.get("/admin-jobs",adminOnly,getAdminJobs);

app.get("/recruiter-jobs",recruiterOnly,getRecruiterJobs);

app
  .route("/:id")
  .get(getSingleJob)
  .put(recruiterOnly,updateJob)
  .delete(recruiterOnly,deleteJob);

export default app;
