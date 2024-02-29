import pkg from "../models/mongooseModels/review.mjs"
import pkgClient from "../models/mongooseModels/clients.mjs"
import mongoose from "mongoose";

export async function createReview(req,res){
    const userData =req.body;
    console.log(req.body)
    try {
        if(userData){
            const review= await pkg.Review.create(userData)
            res.status(200).json(review)
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getDoctorReviews(req,res){
    const {doctorId} =req.query;
    try {
        const review= await pkg.Review.find({doctorId})
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getReviewStatus(req,res){
    const {id}= req.query;
    try {
        const status= await pkg.Review.findOne({appointmentId:id})
        res.status(200).json(status)
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getReviewAverage(req, res) {
    const { id } = req.query;
    try {
        const reviews = await pkg.Review.find({ doctorId: id });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for the specified doctorId" });
        }

        console.log("Reviews:", reviews); // Log the reviews to verify

        const status = await pkg.Review.aggregate([
            {
                $match: {
                    doctorId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: null, // Group all documents into a single group
                    averageRating: { $avg: "$reviewRating" } // Calculate average rating
                }
            }
        ]);

        // Ensure that the status array is not empty
        if (status.length === 0 || status[0].averageRating === null) {
            return res.status(404).json({ message: "No average rating available for the specified doctorId" });
        }

        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error });
    }
}
