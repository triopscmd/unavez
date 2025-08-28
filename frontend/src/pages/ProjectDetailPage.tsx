import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import TaskItem from '../components/TaskItem';
import { Task } from '../contexts/ProjectContext'; // Import Task interface

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading, error, updateProject, fetchTasksForProject, createTask, updateTask, deleteTask } = useProjects();
  const [project, setProject] = useState(projects.find(p => p.id === id));
  const [editMode, setEditMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project?.name || '');
  const [editedProjectDescription, setEditedProjectDescription] = useState(project?.description || '');
  const [editedProjectCategory, setEditedProjectCategory] = useState(project?.category || 'Personal');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskEstimatedDuration, setNewTaskEstimatedDuration] = useState<number | ''>('');


  useEffect(() => {
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setEditedProjectName(foundProject.name);
      setEditedProjectDescription(foundProject.description || '');
      setEditedProjectCategory(foundProject.category);
      // Also fetch tasks if not already loaded, or refresh them
      if (!foundProject.tasks || foundProject.tasks.length === 0) {
        fetchTasksForProject(foundProject.id);
      }
    }
  }, [id, projects, fetchTasksForProject]);


  if (loading) return <div className="text-center text-gray-600">Loading project...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!project) return <div className="text-center text-gray-500">Project not found.</div>;

  const handleUpdateProject = async () => {
    if (!id) return;
    try {
      await updateProject(id, {
        name: editedProjectName,
        description: editedProjectDescription,
        category: editedProjectCategory,
      });
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update project:', err);
      // Handle error, e.g., show a toast message
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newTaskTitle.trim()) return;

    try {
      await createTask(id, {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
        dueDate: newTaskDueDate ? new Date(newTaskDueDate).toISOString() : undefined,
        estimatedDuration: newTaskEstimatedDuration !== '' ? Number(newTaskEstimatedDuration) : undefined,
        status: 'ToDo', // Default status
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setNewTaskEstimatedDuration('');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
      await updateTask(taskId, { status });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          {editMode ? (
            <input
              type="text"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          )}
          <div>
            {editMode ? (
              <>
                <button
                  onClick={handleUpdateProject}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Project
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          {editMode ? (
            <textarea
              value={editedProjectDescription}
              onChange={(e) => setEditedProjectDescription(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          ) : (
            <p className="text-gray-700">{project.description || 'No description provided.'}</p>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Category:</span>
          {editMode ? (
            <select
              value={editedProjectCategory}
              onChange={(e) => setEditedProjectCategory(e.target.value as any)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
              {project.category}
            </span>
          )}
          <span className="ml-4">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tasks</h2>
        {project.tasks && project.tasks.length > 0 ? (
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateStatus={handleUpdateTaskStatus}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks for this project yet.</p>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h3>
          <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Design UI mockups"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="taskDescription"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={2}
                placeholder="Detailed explanation of the task..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700">
                Due Date (Optional)
              </label>
              <input
                type="date"
                id="taskDueDate"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="taskDuration" className="block text-sm font-medium text-gray-700">
                Estimated Duration (minutes, Optional)
              </label>
              <input
                type="number"
                id="taskDuration"
                value={newTaskEstimatedDuration}
                onChange={(e) => setNewTaskEstimatedDuration(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 60"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
