const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toy_id: { type: mongoose.Schema.Types.ObjectId, ref: "Toy" },
    transaction_type: { type: String, enum: ["rent", "sale"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "completed",
    },
    duration: { type: String }, // applicable for rentals
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
