const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.CONNECTION_STRING; // Corrected to match .env key
    if (!uri) {
      throw new Error("CONNECTION_STRING is not defined in .env");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
