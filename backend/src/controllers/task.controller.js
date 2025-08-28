const taskService = require('../services/task.service');

exports.createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params; // Expect projectId from URL for nested route
    const task = await taskService.createTask({ ...req.body, projectId });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasksByProjectId = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksByProjectId(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
