const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  deleteTask
} = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;