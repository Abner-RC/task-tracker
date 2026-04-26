const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks.
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
}

// Get a single task.
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID is not valid' });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: 'Couldn\'t find a task with that ID' });
  }

  res.status(200).json(task);
}

// Post a new task.
const createTask = async (req, res) => {
  const { title, departmentId, userId } = req.body;

  // Store fields array to display empty errors.
  const fields = { title, departmentId, userId };
  let emptyFields = [];

  Object.entries(fields).forEach(([key, value]) => {
    if (!value) emptyFields.push(key);
  });

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all the fields',
      emptyFields
    });
  }

  // Add document to database.
  try {
    const task = await Task.create({ title, departmentId, userId });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a task.
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID is not valid' });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: 'Couldn\'t find a task with that ID' });
  }

  res.status(200).json(task);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
};