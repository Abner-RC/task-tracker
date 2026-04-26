require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');
const departmentsRoutes = require('./routes/departments');

const app = express();

// Middleware.
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} -> ${req.path}`);
  next();
});

// Routes.
app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);
app.use('/api/departments', departmentsRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database.');

    // Listen to server requests.
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error(error);
  });