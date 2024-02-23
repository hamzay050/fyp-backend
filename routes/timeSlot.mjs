import express from "express";
const router = express.Router();
import {
  createTimeSlots,
  getTimeSlotsForDoctor,
} from "../controller/timeSlot.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/", verifyAccessToken, getTimeSlotsForDoctor);
router.post("/", verifyAccessToken, createTimeSlots); // New route for creating Specialization
// router.put("/:specializationId", verifyAccessToken, updateSpecialization);
// router.delete("/:specializationId", verifyAccessToken, deleteSpecialization);

export default router;
