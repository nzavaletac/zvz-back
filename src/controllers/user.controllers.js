const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.create(body);
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 21 * 365,
    });
    res.status(201).json({ token, user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const user = await User.findOne({ email });
    if (!user || !password) {
      throw new Error("Invalid email or password.");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 365,
    });
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};
