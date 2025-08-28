import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface Project {
  id: string;
  name: string;
  description?: string;
  category: 'Personal' | 'Work' | 'Family' | 'Other';
  createdAt: string;
  updatedAt: string;
  tasks?: Task[]; // Optionally include tasks when fetching a detailed project
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  estimatedDuration?: number; // In minutes
  status: 'ToDo' | 'InProgress' | 'Completed';
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  createTask: (projectId: string, task: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>) => Promise<Task>;
  updateTask: (taskId: string, task: Partial<Task>) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  fetchTasksForProject: (projectId: string) => Promise<Task[]>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => {
    try {
      const response = await api.post<Project>('/projects', projectData);
      setProjects((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Failed to create project:', err);
      throw err;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await api.put<Project>(`/projects/${id}`, projectData);
      setProjects((prev) => prev.map((p) => (p.id === id ? response.data : p)));
      return response.data;
    } catch (err) {
      console.error('Failed to update project:', err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      throw err;
    }
  };

  const fetchTasksForProject = async (projectId: string): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>(`/projects/${projectId}/tasks`);
      // Update the specific project in state with fetched tasks
      setProjects(prev => prev.map(p =>
        p.id === projectId ? { ...p, tasks: response.data } : p
      ));
      return response.data;
    } catch (err) {
      console.error(`Failed to fetch tasks for project ${projectId}:`, err);
      throw err;
    }
  };

  const createTask = async (projectId: string, taskData: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post<Task>(`/projects/${projectId}/tasks`, taskData);
      // Optimistically update the project's tasks or refetch
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId
            ? { ...project, tasks: project.tasks ? [...project.tasks, response.data] : [response.data] }
            : project
        )
      );
      return response.data;
    } catch (err) {
      console.error('Failed to create task:', err);
      throw err;
    }
  };

  const updateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      const response = await api.put<Task>(`/tasks/${taskId}`, taskData);
      setProjects(prevProjects =>
        prevProjects.map(project => ({
          ...project,
          tasks: project.tasks?.map(task => (task.id === taskId ? response.data : task)),
        }))
      );
      return response.data;
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setProjects(prevProjects =>
        prevProjects.map(project => ({
          ...project,
          tasks: project.tasks?.filter(task => task.id !== taskId),
        }))
      );
    } catch (err) {
      console.error('Failed to delete task:', err);
      throw err;
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  const value = {
    projects,
    loading,
    error,
    fetchProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    fetchTasksForProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
