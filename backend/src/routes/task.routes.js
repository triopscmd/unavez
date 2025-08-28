const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

// Routes for tasks within a specific project
router.post('/projects/:projectId/tasks', taskController.createTask);
router.get('/projects/:projectId/tasks', taskController.getTasksByProjectId);

// Routes for individual tasks (can be accessed directly if ID is known)
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
