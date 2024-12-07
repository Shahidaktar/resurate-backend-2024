import express from "express";
import { deleteComment, getJobComments, newComment } from "../controllers/comment.js";

const app = express.Router();

app.post("/new", newComment);

app.get("/job/:jobId", getJobComments);

app.delete("/:commentId", deleteComment);

export default app;