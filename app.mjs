import cookieParser from "cookie-parser";
import cors from "cors";

import express from "express";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import setRoutes from "./routes/index.mjs";
import env from "dotenv";
env.config();
const __dirname = path.resolve();

const app = express();
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
  ],
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

setRoutes(app);

// error(app);

export default app;
