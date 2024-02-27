import express from "express"
import { createReport, getAllReports, getApprovedReports, getPendingReports, getRejectedReports,updateReportStatus } from "../controller/report.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

const router= express.Router();

router.post('/',verifyAccessToken,createReport)
router.get('/',verifyAccessToken,getAllReports)
router.get('/pending',verifyAccessToken,getPendingReports)
router.get('/approved',verifyAccessToken,getApprovedReports)
router.get('/cancelled',verifyAccessToken,getRejectedReports)
router.put('/pending-status/:id',verifyAccessToken,updateReportStatus)




export default router;