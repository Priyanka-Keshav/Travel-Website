const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const user_route = require("./Routes/UserRoute");
const places_route = require("./Routes/PlacesRoute");
const book_route = require("./Routes/BookRoute");
const dotenv = require("dotenv");
const connectDb = require("./Models/Connect");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(cors({ origin: "http://localhost:3000" }));
connectDb();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/hello", (req, res) => {
  return res.status(201).json({ message: "Heyyyy you are not dumb" });
});
const PORT = 5000;

app.use("/user", user_route);
app.use("/places", places_route);
app.use("/booking", book_route);
app.listen(PORT, () => {
  console.log("Hey you are smart");
});
