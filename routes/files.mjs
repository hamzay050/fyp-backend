// Import necessary modules
import express from "express";
import { uploadFile, getAllFiles } from "../controller/fileController.mjs";
import upload from "../middleware/multer.mjs";

const router = express.Router();

// Define routes

// Route to upload a file
router.post("/", upload.single("file"), uploadFile);

// Route to get all uploaded files
router.get("/by-appointment-id", getAllFiles);

// Export the router
export default router;
