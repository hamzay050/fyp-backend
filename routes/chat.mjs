// Import necessary modules
import express from "express";
import {
  getAllMessages,
  createMessage,
} from "../controller/chatController.mjs";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getAllMessages);

export default router;
