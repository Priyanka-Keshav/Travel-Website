const mongoose = require("mongoose");
const { Schema } = mongoose;
const PlacesSchema = new Schema({
  country: { type: String, required: true },
  hotel_name: { type: String, required: true },
  addressline1: { type: String, required: true },
  city: { type: String, required: true },
  star_rating: { type: String, required: true },
  overview: { type: String, required: true },
  continent_name: { type: String, required: true },
  photo1: { type: String, required: true },

  photo2: { type: String, required: true },
  photo3: { type: String, required: true },
  photo4: { type: String, required: true },
  photo5: { type: String, required: true },
  city_id: { type: Number, required: true },
});
const Places = mongoose.model("Places", PlacesSchema);
module.exports = Places;
