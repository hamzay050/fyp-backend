import pkg from "../models/mongooseModels/chatMessage.mjs";

async function getAllMessages(req, res) {
  const { senderId, receiverId, appointmentId } = req.query;
  try {
    const messages = await pkg.ChatMessage.find({
      appointmentId: { $exists: true, $ne: null }, // Filter messages with appointmentId
      $or: [
        { senderId, receiverId, appointmentId },
        { senderId: receiverId, appointmentId },
      ],
    }).sort({ createdAt: "asc" }); // Sort by createdAt in descending order
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to create a new chat message
async function createMessage(req, res) {
  const { senderId, receiverId, message, appointmentId } = req.body;
  console.log(
    "🚀 ~ createMessage ~ senderId, receiverId, message:",
    senderId,
    receiverId,
    message,
    appointmentId
  );

  try {
    const chatMessage = await pkg.ChatMessage.create({
      senderId,
      receiverId,
      message,
      appointmentId,
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { getAllMessages, createMessage };
