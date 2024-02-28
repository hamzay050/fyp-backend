import pkg from "../models/mongooseModels/appointment.mjs";
import { updateTimeSlotStatus } from "./timeSlot.mjs";
import pkgClient from "../models/mongooseModels/clients.mjs";
import mongoose from "mongoose"

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, slotId, date, status } = req.body;
    console.log(
      "🚀 ~ createAppointment ~ patientId, doctorId, timeSlotId, date:",
      patientId,
      doctorId,
      slotId,
      date
    );
    const appointment = new pkg.Appointment({
      patientId,
      doctorId,
      slotId,
      date,
      status,
    });
    console.log("🚀 ~ createAppointment ~ appointment:", appointment);
    await appointment.save();
    // updateTimeSlotStatus(timeSlotId, false);
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await pkg.Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await pkg.Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAppointmentByPatientId = async (req, res) => {
  try {
    const { id } = req.query;
    const appointment = await pkg.Appointment.find({ patientId: id });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAppointmentByDoctorId = async (req, res) => {
  try {
    const { id, status } = req.query;
    const appointment = await pkg.Appointment.find({ doctorId: id, status });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update appointment by ID
export const updateAppointmentById = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log("🚀 ~ updateAppointmentById ~ id, status:", id, status);
    const appointment = await pkg.Appointment.findOneAndUpdate(
      { _id: id },
      { status }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete appointment by ID
export const deleteAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    const appointment = await pkg.Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    // updateTimeSlotStatus(); here we will delete time slot

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export async function getPatientDetails(req,res){
  const {id} = req.params;
  try {
    const findPatient= await pkg.Appointment.aggregate([
      {
        $match:{
          doctorId: new mongoose.Types.ObjectId(id),
          status:"pending"
        }
      },
      {
        $lookup:{
          from:"clients",
          localField: "patientId",
          foreignField:"_id",
          as:"patientsData"
        }
      },
      {
        $lookup:{
          from:"timeslots",
          localField:"slotId",
          foreignField:"_id",
          as:"slotsData"
        }
      }
    ])
    res.status(200).json(findPatient)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getPatientApprovedDetails(req,res){
  const {id} = req.params;
  try {
    const findPatient= await pkg.Appointment.aggregate([
      {
        $match:{
          doctorId: new mongoose.Types.ObjectId(id),
          status:"approved"
        }
      },
      {
        $lookup:{
          from:"clients",
          localField: "patientId",
          foreignField:"_id",
          as:"patientsData"
        }
      },
      {
        $lookup:{
          from:"timeslots",
          localField:"slotId",
          foreignField:"_id",
          as:"slotsData"
        }
      }
    ])
    res.status(200).json(findPatient)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getPatientRejectedDetails(req,res){
  const {id} = req.params;
  try {
    const findPatient= await pkg.Appointment.aggregate([
      {
        $match:{
          doctorId: new mongoose.Types.ObjectId(id),
          status:"cancelled"
        }
      },
      {
        $lookup:{
          from:"clients",
          localField: "patientId",
          foreignField:"_id",
          as:"patientsData"
        }
      },
      {
        $lookup:{
          from:"timeslots",
          localField:"slotId",
          foreignField:"_id",
          as:"slotsData"
        }
      }
    ])
    res.status(200).json(findPatient)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getPatientCompletedDetails(req,res){
  const {id} = req.params;
  try {
    const findPatient= await pkg.Appointment.aggregate([
      {
        $match:{
          doctorId: new mongoose.Types.ObjectId(id),
          status:"completed"
        }
      },
      {
        $lookup:{
          from:"clients",
          localField: "patientId",
          foreignField:"_id",
          as:"patientsData"
        }
      },
      {
        $lookup:{
          from:"timeslots",
          localField:"slotId",
          foreignField:"_id",
          as:"slotsData"
        }
      }
    ])
    res.status(200).json(findPatient)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getDoctorDetails(req,res){
  const {id}=req.query;
  try {
    const doctor= await pkg.Appointment.aggregate([
      {
        $match:{
          patientId: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup:{
          from:'clients',
          localField:'doctorId',
          foreignField:"_id",
          as:'doctorProfile'
        }
      }
    ])
    res.status(200).json(doctor)
  } catch (error) {
    res.status(500).json({error})
  }
}


export async function getCompletedAppointments(req,res){
  try {
    const findApproved= await pkg.Appointment.find({status:'completed'})
    res.status(200).json(findApproved)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getRejectedAppointments(req,res){
  try {
    const findApproved= await pkg.Appointment.find({status:'rejected'})
    res.status(200).json(findApproved)
  } catch (error) {
    res.status(500).json({error})
  }
}