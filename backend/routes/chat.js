import express from "express";
import { generateChatReply } from "../services/chatService.js";

export const chatRouter = express.Router();

chatRouter.post("/", async (req, res) => {
  const { message, history } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const reply = await generateChatReply(message, history || []);
    return res.json(reply);
  } catch (error) {
    console.error("Chat error", error);
    return res.status(500).json({ error: "Unable to generate response." });
  }
});
