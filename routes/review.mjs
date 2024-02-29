import express from "express"
import { createReview,getDoctorReviews,getReviewStatus,getReviewAverage } from "../controller/review.mjs";

const router= express.Router();

router.post('/',createReview)
router.get('/byId',getDoctorReviews)
router.get('/status',getReviewStatus)
router.get('/average',getReviewAverage)

export default router;