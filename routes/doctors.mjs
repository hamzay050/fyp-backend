import express from "express";
const router = express.Router();
import { getDoctorProfile, getAllDoctors } from "../controller/doctor.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";
import {
  getDoctorProfiles,
  getDoctorApprovedProfiles,
  getDoctorRejectedProfiles,
  getDoctorPendingProfiles,
  getDoctorAllDetails,
  updateDoctorPendingProfile,
  getAllDoctorsWithRating
} from "../controller/doctorProfile.mjs";
router.get("/", verifyAccessToken, getAllDoctors);
router.get("/rating",getAllDoctorsWithRating)
router.get("/byId", verifyAccessToken, getDoctorProfile);

// router.post("/", verifyAccessToken, createJob); // New route for creating a job
// router.put("/:jobId", verifyAccessToken, updateJob);
// router.delete("/:jobId", verifyAccessToken, deleteJob);
router.get("/doctor-profiles", verifyAccessToken, getDoctorProfiles);
router.get("/doctor-profiles/:id", verifyAccessToken, getDoctorAllDetails);
router.get(
  "/doctor-pending-profiles",
  verifyAccessToken,
  getDoctorPendingProfiles
);
router.put(
  "/doctor-pending-profile/:id",
  verifyAccessToken,
  updateDoctorPendingProfile
);
router.get(
  "/doctor-approved-profiles",
  verifyAccessToken,
  getDoctorApprovedProfiles
);
router.get(
  "/doctor-rejected-profiles",
  verifyAccessToken,
  getDoctorRejectedProfiles
);

export default router;
