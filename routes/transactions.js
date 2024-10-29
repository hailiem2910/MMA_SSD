const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a transaction
router.post("/", authMiddleware, async (req, res) => {
  const { toy_id, transaction_type, amount } = req.body;
  const newTransaction = new Transaction({
    user_id: req.user._id,
    toy_id,
    transaction_type,
    amount,
  });
  await newTransaction.save();
  res.status(201).json(newTransaction);
});

// Get all transactions
router.get("/", authMiddleware, async (req, res) => {
  const transactions = await Transaction.find()
    .populate("user_id")
    .populate("toy_id");
  res.json(transactions);
});

module.exports = router;
