const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Property", PropertySchema);
