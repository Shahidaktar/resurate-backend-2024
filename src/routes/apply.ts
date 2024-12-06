import express from "express";
import {
  allApplies,
  changeStatus,
  deleteApply,
  existingApply,
  getSingleApply,
  myApplies,
  newApply,
} from "../controllers/apply.js";
import {  recruiterOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newApply);

app.get("/my", myApplies);

app.get("/existing/:id", existingApply);

app.get("/all/:id",recruiterOnly, allApplies);

app.route("/:id").get(getSingleApply).put(recruiterOnly,changeStatus).delete(recruiterOnly,deleteApply);

export default app;
