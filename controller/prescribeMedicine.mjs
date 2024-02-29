import pkg from "../models/mongooseModels/prescribeMedicine.mjs";
import pkgAppointment from "../models/mongooseModels/appointment.mjs";
import mongoose from "mongoose";

import fs from "fs";
import path from "path";
import ejs from "ejs";
import pdf from "html-pdf";
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}/${year}`;
}

function convertDatesToenGB(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        typeof obj[key] === "string" &&
        /\b\d{4}-\d{2}-\d{2}\b/.test(obj[key])
      ) {
        obj[key] = formatDate(obj[key]);
      } else if (typeof obj[key] === "object") {
        convertDatesToenGB(obj[key]);
      }
    }
  }
}

// Main function to process array of objects and return only dates in enGB format (only date part)
function convertArrayDatesToenGB(array) {
  const result = [];
  array.forEach((obj) => {
    const newObj = JSON.parse(JSON.stringify(obj)); // Create a deep copy of the object to avoid modifying the original
    convertDatesToenGB(newObj); // Convert dates to enGB date format
    result.push(newObj);
  });
  return result;
}

export async function createMedicine(req, res) {
  const { data } = req.body;
  console.log(data);
  try {
    const newMedicine = await pkg.MedicinePrescribed.create(data);
    res.status(200).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getMedicine(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ error: "Invalid information" });
    }
    const getMedicines = await pkg.MedicinePrescribed.find({
      appointmentId: id,
    });
    res.status(200).json(getMedicines);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteMedicine(req, res) {
  const { id } = req.params;
  try {
    const removeMedicine = await pkg.MedicinePrescribed.findByIdAndDelete(id);
    res.status(200).json(removeMedicine);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function updateAppointmentStatus(req, res) {
  const { id, status } = req.body;
  try {
    const update = await pkgAppointment.Appointment.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.statue(500).json({ error });
  }
}

export async function getPatientData(req, res) {
  const { id } = req.params;
  try {
    const findPatient = await pkgAppointment.Appointment.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "patientId",
          foreignField: "_id",
          as: "profileDetails",
        },
      },
    ]);
    res.status(200).json(findPatient);
  } catch (error) {
    res.status(200).json({ error });
  }
}

export async function getAppointmentStatus(req, res) {
  const { id } = req.params;
  try {
    const findStatus = await pkgAppointment.Appointment.findById(id);
    res.status(200).json(findStatus);
  } catch (error) {
    res.status(200).json({ error });
  }
}
export async function generatePrescriptionPDF(req, res) {
  const { id } = req.params;
  try {
    const prescriptions = await pkg.MedicinePrescribed.find({
      appointmentId: id,
    });
    const updatedArrayWithDateFormat = convertArrayDatesToenGB(prescriptions);
    const template = fs.readFileSync("./views/prescription.ejs", "utf8");
    const html = await ejs.render(template, {
      prescriptions: updatedArrayWithDateFormat,
    });

    pdf.create(html).toBuffer(async (err, buffer) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="prescription.pdf"'
      );

      // Send the PDF buffer as response
      res.send(buffer);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
