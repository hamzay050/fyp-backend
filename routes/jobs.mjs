import express from "express";
const router = express.Router();
import {
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controller/jobsController.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken.mjs";

router.get("/:jobId", verifyAccessToken, getJob);
router.post("/", verifyAccessToken, createJob); // New route for creating a job
router.put("/:jobId", verifyAccessToken, updateJob);
router.delete("/:jobId", verifyAccessToken, deleteJob);

export default router;
