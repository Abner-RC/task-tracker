const User = require('../models/userModel');
const mongoose = require('mongoose');

// Get all users.
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
}

// Get a single user.
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID is not valid' });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: 'Couldn\'t find a user with that ID' });
  }

  res.status(200).json(task);
}

// Log-in user.
const logInUser = async (req, res) => {
  res.json({ msg: 'Log-in user' });
}

// Sign-up user.
const signUpUser = async (req, res) => {
  const { email, name, departmentId, password } = req.body;

  try {
    const user = await User.signUp(email, name, departmentId, password);

    res.status(201).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  logInUser,
  signUpUser,
};