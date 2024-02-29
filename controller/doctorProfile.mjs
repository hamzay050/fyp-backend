import pkg from "../models/mongooseModels/clients.mjs"
import mongoose from "mongoose";

export async function getDoctorProfiles(req,res){
    try {
        const findDoctors = await pkg.Clients.find({ role:'doctor'});
        res.status(200).json(findDoctors);
      } catch (error) {
        res.status(500).json({ error });
        console.log(error)
      }  
}

export async function getDoctorPendingProfiles(req,res){
  try {
    const findPendingDoctors= await pkg.Clients.find({role:'doctor',status:'pending'});
    res.status(200).json(findPendingDoctors)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getDoctorApprovedProfiles(req,res){
  try {
    const findDoctorApproved= await pkg.Clients.find({role:'doctor',status:'approved'});
    res.status(200).json(findDoctorApproved)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getDoctorRejectedProfiles(req,res){
  try {
    const findDoctorRejected= await pkg.Clients.find({role:'doctor',status:'rejected'});
    res.status(200).json(findDoctorRejected)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getDoctorAllDetails(req,res){
  const {id}= req.params;
  console.log(id)
   try {
     if(id){
      const result= await pkg.Clients.aggregate([
        {
          $match:{
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup:{
            from:'educations',
            localField:'_id',
            foreignField:'clientId',
            as:'educationData'
          }
        },
        {
          $lookup:{
            from :'certificates',
            localField:'_id',
            foreignField:'clientId',
            as:'certificationData'
          }
        },
        {
          $lookup:{
            from: 'jobs',
            localField:'_id',
            foreignField:'clientId',
            as:'jobsData'
          }
        },
        
       ])
       console.log(result[0])
       res.status(200).json(result[0])
     }
   } catch (error) {
    console.log(error)
    res.status(500).json({error})
   }
}

export async function updateDoctorPendingProfile(req,res){
  const {id}= req.params;
  const data= req.body;
  try {
   const updateDoctorProfile= await pkg.Clients.findByIdAndUpdate(id,data,{new:true})
   res.status(200).json(updateDoctorProfile) 
  } catch (error) {
    res.status(500).json({error})
  }
}


export async function getAllDoctorsWithRating(req,res){
  try {
    const result= await pkg.Clients.aggregate([
      {
        $match:{
          role:'doctor',
          status:'approved'
        }
      },
      {
        $lookup:{
          from:'reviews',
          localField:'_id',
          foreignField:'doctorId',
          as:'reviewsData'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviewsData.reviewRating' }
        }
      },
    ])
    res.status(200).json(result)
    console.log(result)
  } catch (error) {
    res.status(500).json({error})
  }
}