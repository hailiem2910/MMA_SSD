const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    toy_id: { type: mongoose.Schema.Types.ObjectId, ref: "Toy" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["rent", "sale"], required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
    rent_duration: { type: String }, // e.g., '1 day', '1 week', '2 weeks'
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
