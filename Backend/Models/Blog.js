const mongoose = require("mongoose");
const Booking = require("./Booking");
const { Schema } = mongoose;
const BlogSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  Booking: { type: mongoose.Schema.ObjectId, ref: "Booking" },
});
const Blog = mongoose.Schema("Blog", BlogSchema);
module.exports = Blog;
