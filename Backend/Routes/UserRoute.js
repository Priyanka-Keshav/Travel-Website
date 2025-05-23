const {
  login,
  signup,
  forgot_pwd,
  reset_pwd,
} = require("../Functions/UserFunc.js");
const express = require("express");
const { body } = require("express-validator");
const Routes = express.Router();
const validateSignup = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter (A-Z)")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter (a-z)")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit (0-9)")
    .matches(/[!@#$%^&*()_+{}:;<>,.?/~]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)"
    ),
];
const validateLogin = [
  body("email").isEmail().withMessage("Inavlid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];
Routes.post("/login", validateLogin, login);
Routes.post("/signup", validateSignup, signup);
Routes.post("/forgot-password", forgot_pwd);
Routes.post("/reset-pwd/:id/:token", reset_pwd);
module.exports = Routes;
