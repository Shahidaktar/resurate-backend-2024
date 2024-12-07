import express from "express";
import {
  deletePost,
  getAllPosts,
  newPost
} from "../controllers/post.js";
import { singleUploadPhoto } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", singleUploadPhoto, newPost);

app.get("/all", getAllPosts);

app.delete("/:postId", deletePost);

export default app;
