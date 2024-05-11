import express from "express";
import { deleteJob, getAdminJobs, getAllJobs, getSingleJob, newJob, updateJob } from "../controllers/job.js";
import { adminOnly } from "../middlewares/auth.js";



const app = express.Router();

app.post("/new",adminOnly,newJob);

app.get("/all", getAllJobs);

app.get("/admin-jobs",adminOnly,getAdminJobs);

app
  .route("/:id")
  .get(getSingleJob)
  .put(adminOnly,updateJob)
  .delete(adminOnly,deleteJob);

export default app;
