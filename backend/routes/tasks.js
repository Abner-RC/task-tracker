const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  deleteTask
} = require('../controllers/taskController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// Route protection.
router.use(requireAuth);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;