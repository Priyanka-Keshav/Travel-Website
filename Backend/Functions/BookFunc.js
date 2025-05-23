const Booking = require("../Models/Booking");
const User = require("../Models/User");
const Places = require("../Models/Places");
const book_rooms = async (req, res) => {
  try {
    const {
      user_id,
      place_id,
      phone,
      name,
      checkin_date,
      checkout_date,
      rooms,
      people,
    } = req.body;
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.status(401).json({ message: "User should sign-up first" });
    } else {
      const data = new Booking({
        user: user_id,
        places: place_id,
        checkin_date: checkin_date,
        checkout_date: checkout_date,
        Rooms: rooms,
        People: people,
        phone: phone,
        name: name,
      });
      await data.save();
      return res.status(201).json({ message: data });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const show_history = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await Booking.find({ user: user_id });
    if (!user) {
      return res.status(401).json({
        message:
          "It looks like you haven't booked any rooms yet. Start exploring and find the perfect stay for your next adventure!",
      });
    } else {
      return res.status(201).json({ message: user });
    }
  } catch (err) {
    return res.status(400).json({ message: "Internal server error" });
  }
};
module.exports = { book_rooms, show_history };
