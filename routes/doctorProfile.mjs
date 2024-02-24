import express from "express";
import {
  getDoctorProfiles,
  getDoctorApprovedProfiles,
  getDoctorRejectedProfiles,
  getDoctorPendingProfiles,
  getDoctorAllDetails,
  updateDoctorPendingProfile
} from "../controller/doctorProfile.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

const router = express.Router();

router.get('/doctor-profiles',verifyAccessToken,getDoctorProfiles);
router.get('/doctor-profiles/:id',verifyAccessToken,getDoctorAllDetails);
router.get('/doctor-pending-profiles',verifyAccessToken,getDoctorPendingProfiles);
router.put('/doctor-pending-profile/:id',verifyAccessToken,updateDoctorPendingProfile);
router.get('/doctor-approved-profiles',verifyAccessToken,getDoctorApprovedProfiles);
router.get('/doctor-rejected-profiles',verifyAccessToken,getDoctorRejectedProfiles);


export default router;
