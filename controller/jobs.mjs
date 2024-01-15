// Import the Jobs model
import Jobs from "../models/jobsModel.mjs";

// Controller function to get a job by ID
export const getJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Jobs.findById(jobId);
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new job
export const createJob = async (req, res) => {
  const jobData = req.body;

  try {
    const newJob = await Jobs.create(jobData);
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a job by ID
export const updateJob = async (req, res) => {
  const jobId = req.params.jobId;
  const updatedData = req.body;

  try {
    const updatedJob = await Jobs.findByIdAndUpdate(jobId, updatedData, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a job by ID
export const deleteJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const deletedJob = await Jobs.findByIdAndDelete(jobId);
    res.status(200).json(deletedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
