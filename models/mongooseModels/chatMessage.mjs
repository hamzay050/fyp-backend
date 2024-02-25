// Import mongoose
import mongoose from "mongoose";

// Define the schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default { ChatMessage };
