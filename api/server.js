import "dotenv/config";

import express from "express";
const app = express();
console.log(app.listen);
const PORT = 8000;
import taskRouter from "./router.js";
import { connectDB } from "./src/config/dbConfig.js";
import cors from "cors";
import morgan from "morgan";
// DB connect
connectDB();

// setup static content serve
import path from "path";
const __dirname = path.resolve();

app.use(express.static(__dirname + "/build"));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/task", taskRouter);

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
