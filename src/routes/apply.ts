import express from "express";
import {
  allApplies,
  changeStatus,
  deleteApply,
  getSingleApply,
  myApplies,
  newApply,
} from "../controllers/apply.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newApply);

app.get("/my", myApplies);

app.get("/all/:id",adminOnly, allApplies);

app.route("/:id").get(getSingleApply).put(adminOnly,changeStatus).delete(adminOnly,deleteApply);

export default app;
