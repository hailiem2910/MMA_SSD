const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
