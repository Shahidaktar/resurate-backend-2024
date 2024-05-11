import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import { getResume, newResume } from "../controllers/resume.js";

const app = express.Router();

app.post("/new",singleUpload,newResume); // singleUpload,

app.get("/:id",getResume ); 

export default app;