const prisma = require('../config/db');

exports.createTask = async (taskData) => {
  return prisma.task.create({
    data: taskData,
  });
};

exports.getTasksByProjectId = async (projectId) => {
  return prisma.task.findMany({
    where: { projectId },
    orderBy: { dueDate: 'asc' }, // Order tasks by due date
  });
};

exports.getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

exports.updateTask = async (id, taskData) => {
  return prisma.task.update({
    where: { id },
    data: taskData,
  });
};

exports.deleteTask = async (id) => {
  return prisma.task.delete({
    where: { id },
  });
};
