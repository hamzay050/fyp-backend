import express from "express";
const router = express.Router();
import {
  getSpecialization,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
} from "../controller/specialization.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/:clientId", verifyAccessToken, getSpecialization);
router.post("/", verifyAccessToken, createSpecialization); // New route for creating Specialization
router.put("/:specializationId", verifyAccessToken, updateSpecialization);
router.delete("/:specializationId", verifyAccessToken, deleteSpecialization);

export default router;
