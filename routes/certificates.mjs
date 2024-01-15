import express from "express";
const router = express.Router();
import {
  getCertificate,
  updateCertificate,
  deleteCertificate,
  createCertificate,
} from "../controller/certificateController.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken.mjs";

router.get("/:certificateId", verifyAccessToken, getCertificate);
router.put("/:certificateId", verifyAccessToken, updateCertificate);
router.delete("/:certificateId", verifyAccessToken, deleteCertificate);
router.post("/", verifyAccessToken, createCertificate);

export default router;
