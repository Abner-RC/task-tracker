const express = require('express');
const {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');
const router = express.Router();

router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post('/', createDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;