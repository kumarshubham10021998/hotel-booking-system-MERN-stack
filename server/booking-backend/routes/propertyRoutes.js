const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single property by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new property
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a property by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: req.body }, // Update with the new data from the request body
      { new: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a property by ID (optional, if needed)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
