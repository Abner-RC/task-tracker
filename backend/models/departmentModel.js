const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const departmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Department', taskSchema);