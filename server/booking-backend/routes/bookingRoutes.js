const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User"); // Import the User model for validation
const Property = require("../models/Property"); // Import the Property model for validation

// Get bookings by user
router.get("/:userId", async (req, res) => {
  try {
    // Ensure user exists before fetching bookings
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch bookings by user ID and populate property details
    const bookings = await Booking.find({ user: req.params.userId }).populate("property");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a booking
router.post("/", async (req, res) => {
  const { user, property, checkIn, checkOut } = req.body;

  try {
    // Ensure the user exists by checking the user ID
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure the property exists by checking the property ID
    const foundProperty = await Property.findById(property);
    if (!foundProperty) {
      return res.status(404).json({ error: "Property not found." });
    }

    // Ensure check-out date is after check-in date
    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({ error: "Check-out date must be after check-in date." });
    }

    // Create the booking
    const newBooking = new Booking({
      user: mongoose.Types.ObjectId(user),  // Ensure the user is cast to ObjectId
      property: mongoose.Types.ObjectId(property),  // Ensure the property is cast to ObjectId
      checkIn,
      checkOut,
    });

    // Save the booking
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
