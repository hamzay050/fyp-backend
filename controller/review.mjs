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