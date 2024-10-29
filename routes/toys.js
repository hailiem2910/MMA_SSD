const express = require("express");
const Toy = require("../models/Toy");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all toys
router.get("/", async (req, res) => {
  try {
    const toys = await Toy.find({});
    // Kiểm tra nếu không có món đồ chơi nào được tìm thấy
    if (!toys || toys.length === 0) {
      return res.status(404).json({ message: "No toys found" });
    }
    res.status(200).json(toys);
  } catch (error) {
    console.error("Failed to fetch toys:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch toys", error: error.message });
  }
});

// Create a toy (Supplier only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "supplier") {
    return res.status(403).send("Access denied");
  }

  const {
    name,
    category,
    description,
    price,
    availability,
    is_rentable,
    is_saleable,
    inventory_count,
    imageUrl, // Thêm imageUrl vào đây
  } = req.body;

  try {
    const newToy = new Toy({
      name,
      category,
      description,
      price,
      availability,
      is_rentable,
      is_saleable,
      supplier_id: req.user._id,
      inventory_count,
      imageUrl, // Và đây
    });

    await newToy.save();
    res.status(201).json(newToy);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create toy", error });
  }
});

// Update a toy
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedToy) {
      return res.status(404).json({ message: "Toy not found" });
    }
    res.json(updatedToy);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update toy", error });
  }
});

// Delete a toy
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const toyId = req.params.id.trim(); // Thêm trim() nếu cần
    const deletedToy = await Toy.findByIdAndDelete(toyId);
    if (!deletedToy) {
      return res.status(404).json({ message: "Toy not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete toy", error });
  }
});

module.exports = router;

// Create a toy (Supplier only)
// router.post("/", authMiddleware, async (req, res) => {
//   if (req.user.role !== "supplier") {
//     return res.status(403).send("Access denied");
//   }

//   const {
//     name,
//     category,
//     description,
//     price,
//     availability,
//     is_rentable,
//     is_saleable,
//     inventory_count,
//   } = req.body;

//   try {
//     const newToy = new Toy({
//       name,
//       category,
//       description,
//       price,
//       availability,
//       is_rentable,
//       is_saleable,
//       supplier_id: req.user._id, // Ensure this is set correctly
//       inventory_count,
//     });

//     await newToy.save();
//     res.status(201).json(newToy);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Failed to create toy", error });
//   }
// });

// Update a toy
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true, // Optional: Ensures validation
//     });
//     if (!updatedToy) {
//       return res.status(404).json({ message: "Toy not found" });
//     }
//     res.json(updatedToy);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Failed to update toy", error });
//   }
// });
