import pkg from "../models/mongooseModels/chatMessage.mjs";

async function getAllMessages(req, res) {
  const { senderId, receiverId } = req.query;
  try {
    const messages = await pkg.ChatMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to create a new chat message
async function createMessage(req, res) {
  const { senderId, receiverId, message } = req.body;
  console.log(
    "🚀 ~ createMessage ~ senderId, receiverId, message:",
    senderId,
    receiverId,
    message
  );

  try {
    const chatMessage = await pkg.ChatMessage.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { getAllMessages, createMessage };
