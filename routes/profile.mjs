import express from "express";

const router = express.Router();
import {
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  updateDoctorProfile,
  getAllPatients,
  uploadProfilePic,
  getMonthlyRegisteration
} from "../controller/clientProfile.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";
import upload from "../middleware/multer.mjs";

router.get("/:clientId", verifyAccessToken, getClientProfile);
router.put("/:clientId", verifyAccessToken, updateClientProfile);
router.put("/update-doctor-profile", verifyAccessToken, updateDoctorProfile);
router.delete("/:clientId", verifyAccessToken, deleteClientProfile);
router.get("/patient/profiles",verifyAccessToken, getAllPatients);
router.get("/monthly/registered",getMonthlyRegisteration)
router.post("/upload-profile-pic", upload.single("file"), uploadProfilePic);
export default router;
