const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  departmentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);