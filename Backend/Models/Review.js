const mongoose = require("mongoose");
const Places = require("./Places");
const { Schema } = mongoose;
const ReviewSchema = new Schema({
  description: { type: String, required: true },
  stars: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  places: { type: mongoose.Schema.ObjectId, ref: "Places" },
  booking: { type: mongoose.Schema.ObjectId, ref: "Booking" },
});
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
