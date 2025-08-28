import { useProjects as useProjectsContext } from '../contexts/ProjectContext';

// This hook simply re-exports the context consumer.
// It exists to match the file structure and provide a consistent entry point for consuming project data.
const useProjects = () => {
  return useProjectsContext();
};

export default useProjects;
