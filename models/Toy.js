// const mongoose = require("mongoose");

// const toySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     description: { type: String },
//     price: {
//       day: { type: Number, required: true },
//       week: { type: Number, required: true },
//       twoWeeks: { type: Number, required: true },
//     },
//     availability: { type: Boolean, default: true },
//     is_rentable: { type: Boolean, default: true },
//     is_saleable: { type: Boolean, default: true },
//     supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     inventory_count: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Toy", toySchema);
const mongoose = require("mongoose");

const toySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }, // Thêm thuộc tính link hình ảnh
    price: {
      day: { type: Number, required: true },
      week: { type: Number, required: true },
      twoWeeks: { type: Number, required: true },
    },
    availability: { type: Boolean, default: true },
    is_rentable: { type: Boolean, default: true },
    is_saleable: { type: Boolean, default: true },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    inventory_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Toy", toySchema);
