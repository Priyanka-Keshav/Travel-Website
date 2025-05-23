const express = require("express");
const { book_rooms, show_history } = require("../Functions/BookFunc");
const route = express.Router();
route.post("/rooms", book_rooms);
route.post("/history", show_history);
module.exports = route;
