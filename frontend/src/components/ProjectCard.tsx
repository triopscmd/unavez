import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    category: 'Personal' | 'Work' | 'Family' | 'Other';
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const { updateProject } = useProjects();
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to project detail
    e.stopPropagation(); // Stop propagation to parent Link
    if (window.confirm(`Are you sure you want to delete project "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  // Dummy update to demonstrate interaction
  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await updateProject(project.id, { category: e.target.value as any }); // Type assertion for simplicity
  };

  return (
    <Link to={`/projects/${project.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 relative">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description || 'No description provided.'}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
            {project.category}
          </span>
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <select
            value={project.category}
            onChange={handleCategoryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1"
            onClick={(e) => e.stopPropagation()} // Prevent link navigation
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Family">Family</option>
            <option value="Other">Other</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
            title="Delete Project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
