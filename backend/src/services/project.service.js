const prisma = require('../config/db');

exports.createProject = async (projectData) => {
  return prisma.project.create({
    data: projectData,
  });
};

exports.getAllProjects = async () => {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

exports.getProjectById = async (id) => {
  return prisma.project.findUnique({
    where: { id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } }, // Include tasks when fetching a single project
  });
};

exports.updateProject = async (id, projectData) => {
  return prisma.project.update({
    where: { id },
    data: projectData,
  });
};

exports.deleteProject = async (id) => {
  // Prisma has cascade delete defined in schema for tasks, so tasks will be deleted too.
  return prisma.project.delete({
    where: { id },
  });
};
