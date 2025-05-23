const mongoose = require("mongoose");
const { Schema } = mongoose;
const BookingSchema = new Schema({
  places: { type: mongoose.Schema.ObjectId, ref: "Places" },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  name: { type: String },
  phone: { type: Number, required: true },
  checkin_date: { type: Date, required: true },
  checkout_date: { type: Date, required: true },
  Rooms: { type: Number, required: true, default: 1 },
  People: { type: Number, required: true, default: 1 },
});
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
