import moment from "moment";

import pkg from "../models/mongooseModels/timeSlot.mjs";

const getTimeSlotsForDoctor = async (req, res) => {
  const { doctorId } = req.query;

  try {
    const timeSlots = await pkg.TimeSlot.find({ doctorId });

    // Initialize an object to hold start and end times for each day
    const schedule = {};

    // Iterate over each time slot and populate the schedule object
    timeSlots.forEach((slot) => {
      if (!schedule[slot.day]) {
        schedule[slot.day] = {
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      } else {
        // Update start and end times if necessary
        if (slot.startTime < schedule[slot.day].startTime) {
          schedule[slot.day].startTime = slot.startTime;
        }
        if (slot.endTime > schedule[slot.day].endTime) {
          schedule[slot.day].endTime = slot.endTime;
        }
      }
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to create time slots

const createTimeSlots = async (req, res) => {
  const { timeSlots, doctorId } = req.body;
  console.log("🚀 ~ createTimeSlots ~ timeSlots:", timeSlots, doctorId);

  try {
    // Iterate over each day in the request body
    for (const day in timeSlots) {
      if (timeSlots.hasOwnProperty(day)) {
        const { isAvailable, startTime, endTime } = timeSlots[day];

        // Calculate time slots for 10 minutes interval
        const startMoment = moment(startTime, "HH:mm");
        const endMoment = moment(endTime, "HH:mm");
        const timeSlotsArray = [];

        while (startMoment.isBefore(endMoment)) {
          timeSlotsArray.push({
            day,
            startTime: startMoment.format("HH:mm"),
            endTime: startMoment.add(10, "minutes").format("HH:mm"),
            isAvailable,
            doctorId,
            // Add other necessary fields like doctor id
          });
        }

        // Create time slots in the database
        await pkg.TimeSlot.insertMany(timeSlotsArray);
      }
    }

    res.status(201).json({ message: "Time slots created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to update time slots
const updateTimeSlots = async (req, res) => {
  const { timeSlots } = req.body;

  try {
    // Iterate over each day in the request body
    for (const day in timeSlots) {
      if (timeSlots.hasOwnProperty(day)) {
        const { isAvailable, startTime, endTime } = timeSlots[day];

        // Calculate time slots for 10 minutes interval
        const startMoment = moment(startTime, "HH:mm");
        const endMoment = moment(endTime, "HH:mm");
        const timeSlotsArray = [];

        while (startMoment.isBefore(endMoment)) {
          timeSlotsArray.push({
            day,
            startTime: startMoment.format("HH:mm"),
            endTime: startMoment.add(10, "minutes").format("HH:mm"),
            isAvailable,
            // Add other necessary fields like doctor id
          });
        }

        // Update time slots in the database
        await pkg.TimeSlot.deleteMany({ day }); // Remove existing time slots for the day
        await pkg.TimeSlot.insertMany(timeSlotsArray); // Insert updated time slots
      }
    }

    res.status(200).json({ message: "Time slots updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to remove time slots for a specific day
const removeTimeSlots = async (req, res) => {
  const { day } = req.params;

  try {
    // Remove time slots for the specified day
    await pkg.TimeSlot.deleteMany({ day });

    res.status(200).json({ message: "Time slots removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createTimeSlots,
  updateTimeSlots,
  removeTimeSlots,
  getTimeSlotsForDoctor,
};
