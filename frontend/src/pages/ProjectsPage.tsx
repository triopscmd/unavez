import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../contexts/ProjectContext';
import { Project } from '../contexts/ProjectContext'; // Import Project interface

const ProjectsPage: React.FC = () => {
  const { projects, loading, error, createProject, deleteProject } = useProjects();
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<Project['category']>('Personal');

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      await createProject({
        name: newProjectName.trim(),
        description: newProjectDescription.trim() || undefined,
        category: newProjectCategory,
      });
      setNewProjectName('');
      setNewProjectDescription('');
      setNewProjectCategory('Personal');
    } catch (err) {
      console.error('Error creating project:', err);
      // Optionally, display an error message to the user
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
    } catch (err) {
      console.error('Error deleting project:', err);
      // Optionally, display an error message
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Project</h2>
        <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Learn new language"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              id="projectDescription"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="A brief overview of the project goals..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="projectCategory" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="projectCategory"
              value={newProjectCategory}
              onChange={(e) => setNewProjectCategory(e.target.value as Project['category'])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No projects created yet. Start by adding one above!</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
