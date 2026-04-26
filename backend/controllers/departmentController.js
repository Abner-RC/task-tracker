const Department = require('../models/departmentModel');
const mongoose = require('mongoose');

// Get all departments.
const getDepartments = async (req, res) => {
  const departments = await Department.find({});
  res.status(200).json(departments);
}

// Get a single department.
const getDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID is not valid' });
  }

  const department = await Department.findById(id);

  if (!department) {
    return res.status(404).json({ error: 'Couldn\'t find a department with that ID' });
  }

  res.status(200).json(department);
}

// Post a new department.
const createDepartment = async (req, res) => {
  const { title, className } = req.body;

  // Add document to database.
  try {
    const department = await Department.create({ title, className });
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a department.
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID is not valid' });
  }

  const department = await Department.findOneAndDelete({ _id: id });

  if (!department) {
    return res.status(404).json({ error: 'Couldn\'t find a department with that ID' });
  }

  res.status(200).json(department);
}

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
};