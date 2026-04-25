require('dotenv').config();

const express = require('express');
const tasksRoutes = require('./routes/tasks');

const app = express();

// Middleware.
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} -> ${req.path}`);
  next();
});

// Routes.
app.use('/api/tasks', tasksRoutes);

// Listen to server requests.
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});