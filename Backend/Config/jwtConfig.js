require("dotenv").config();
module.exports = process.env.JWT_SECRET || "fallback_secret"; // Ensures a default value
