// Import necessary modules
import express from "express";
import { uploadFile, getAllFiles } from "./fileController.mjs";
import upload from "./MulterConfig.mjs";

const router = express.Router();

// Define routes

// Route to upload a file
router.post("/upload", upload.single("file"), uploadFile);

// Route to get all uploaded files
router.get("/files", getAllFiles);

// Export the router
export default router;
