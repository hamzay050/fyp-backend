// Import mongoose
import mongoose from "mongoose";
const { Schema, Types } = mongoose;
// Define the schema for file documents
const fileDocumentSchema = new Schema({
  appointmentId: {
    type: Types.ObjectId,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
});

// Create a model from the schema
const FileDocument = mongoose.model("FileDocument", fileDocumentSchema);

// Export the model
export default { FileDocument };
