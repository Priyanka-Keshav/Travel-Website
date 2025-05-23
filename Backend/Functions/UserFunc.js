const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { body, validationResult } = require("express-validator");
const secretKey = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// User Login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Remove password from user object before sending
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.status(200).json({
      userId: user._id, // Explicitly set user ID in the response
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// User Signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: errors.array() });
    }
    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
//forgot-password
const forgot_pwd = async (req, res) => {
  try {
    const { email } = req.body;
    const user_exists = await User.findOne({ email });
    if (user_exists) {
      const resetToken = jwt.sign(
        { id: user_exists._id, email: user_exists.email },
        secretKey,
        { expiresIn: "1h" }
      );
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "ooja.bhuvi123@gmail.com", pass: "wtrhaskdetvsploa" },
      });
      const mailOptions = {
        from: "ooja.bhuvi123@gmail.com",
        to: user_exists.email,
        subject: "Password reset",
        text: `http://localhost:3000/reset-password/${user_exists._id}/${resetToken}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error sending email", error: error.message });
        } else {
          return res
            .status(200)
            .json({ message: "Password reset email sent", info });
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "User does not exist sign up first" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
//reset-password
const reset_pwd = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(400).json({ Status: "Error with token" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hash });
    return res
      .status(201)
      .json({ message: "New password updated successfully" });
  } catch (updateError) {
    return res
      .status(500)
      .json({ message: "Error updating password", error: updateError.message });
  }
};

module.exports = { login, signup, forgot_pwd, reset_pwd };
