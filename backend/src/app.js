require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', projectRoutes);
app.use('/api', taskRoutes); 

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
