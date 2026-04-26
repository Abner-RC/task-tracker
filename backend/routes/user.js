const express = require('express');
const {
  getUsers,
  getUser,
  logInUser,
  signUpUser,
} = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/login', logInUser);
router.post('/signup', signUpUser);

module.exports = router;