const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/travel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected");
  } catch (err) {
    console.log("error occured i.e:", err);
  }
};
module.exports = connectDb;
