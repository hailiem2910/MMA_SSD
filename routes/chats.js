const express = require("express");
const Chat = require("../models/Chat");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send a message
router.post("/", authMiddleware, async (req, res) => {
  const { receiver_id, message } = req.body;
  const newChat = new Chat({ sender_id: req.user._id, receiver_id, message });
  await newChat.save();
  res.status(201).json(newChat);
});

// Get chat history
router.get("/:userId", authMiddleware, async (req, res) => {
  const chats = await Chat.find({
    $or: [
      { sender_id: req.params.userId, receiver_id: req.user._id },
      { sender_id: req.user._id, receiver_id: req.params.userId },
    ],
  }).populate("sender_id receiver_id");
  res.json(chats);
});

module.exports = router;
