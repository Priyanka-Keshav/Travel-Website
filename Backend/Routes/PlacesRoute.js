const express = require("express");
const Routes = express.Router();
const {
  insert_data,
  give_based,
  popular_review,
  get_continent,
  get_values,
  get_cities,
  popular_review_continent,
  get_unique_countries,
  getby_id,
  get_cities_name,
} = require("../Functions/PlacesFunc");
Routes.post("/insert", insert_data);
Routes.post("/get", give_based);
Routes.post("/popular", popular_review);
Routes.get("/values", get_values);
Routes.get("/cities", get_cities);
Routes.post("/continent", get_continent);
Routes.post("/continent/rating", popular_review_continent);
Routes.get("/country_names", get_unique_countries);
Routes.post("/id", getby_id);
Routes.post("/city", get_cities_name);
module.exports = Routes;
