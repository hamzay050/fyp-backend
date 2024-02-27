import express from "express"
import { createReview,getDoctorReviews,getReviewStatus } from "../controller/review.mjs";

const router= express.Router();

router.post('/',createReview)
router.get('/byId',getDoctorReviews)
router.get('/status',getReviewStatus)

export default router;