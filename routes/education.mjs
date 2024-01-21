import express from "express";
const router = express.Router();
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controller/education.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/:clientId", verifyAccessToken, getEducation);
router.post("/", verifyAccessToken, createEducation); // New route for creating education
router.put("/:educationId", verifyAccessToken, updateEducation);
router.delete("/:educationId", verifyAccessToken, deleteEducation);

export default router;
