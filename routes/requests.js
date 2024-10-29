const express = require("express");
const Request = require("../models/Request");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a request
router.post("/", authMiddleware, async (req, res) => {
  const { toy_id, type, rent_duration, price } = req.body;
  const newRequest = new Request({
    toy_id,
    user_id: req.user._id,
    type,
    rent_duration,
    price,
  });
  await newRequest.save();
  res.status(201).json(newRequest);
});

// Get all requests
router.get("/", authMiddleware, async (req, res) => {
  const requests = await Request.find().populate("user_id").populate("toy_id");
  res.json(requests);
});

// Update a request
router.put("/:id", authMiddleware, async (req, res) => {
  const updatedRequest = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedRequest);
});

module.exports = router;
