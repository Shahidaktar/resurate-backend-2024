import express from "express";

import userRoute from "./routes/user.js";
import jobRoute from "./routes/job.js";
import applyRoute from "./routes/apply.js";
import resumeRoute from "./routes/resume.js";
import postRoute from "./routes/post.js";

import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "";

connectDB(mongoUri);

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/apply", applyRoute);
app.use("/api/v1/resume", resumeRoute);
app.use("/api/v1/post", postRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
