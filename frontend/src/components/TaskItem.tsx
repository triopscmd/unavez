import React from 'react';
import { Task } from '../contexts/ProjectContext'; // Import Task interface

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'ToDo':
        return 'bg-gray-200 text-gray-800';
      case 'InProgress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(task.id, e.target.value as Task['status']);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm mb-3">
      <div className="flex-grow">
        <h4 className={`text-lg font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h4>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
          {task.dueDate && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M7 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-2M4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
              </svg>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          {task.estimatedDuration && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Est: {task.estimatedDuration} mins
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3 ml-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${getStatusColor(task.status)}`}
        >
          <option value="ToDo">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
