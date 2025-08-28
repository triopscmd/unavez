import React from 'react';
import DashboardWidget from '../components/DashboardWidget';
import { useProjects } from '../contexts/ProjectContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <div className="text-center text-gray-600">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const totalProjects = projects.length;
  const totalTasks = projects.reduce((sum, project) => sum + (project.tasks?.length || 0), 0);
  const tasksToDo = projects.reduce((sum, project) => sum + (project.tasks?.filter(task => task.status === 'ToDo').length || 0), 0);
  const tasksInProgress = projects.reduce((sum, project) => sum + (project.tasks?.filter(task => task.status === 'InProgress').length || 0), 0);
  const tasksCompleted = projects.reduce((sum, project) => sum + (project.tasks?.filter(task => task.status === 'Completed').length || 0), 0);

  // Simple upcoming tasks (next 7 days, 'ToDo' or 'InProgress')
  const today = new Date();
  const nextSevenDays = new Date();
  nextSevenDays.setDate(today.getDate() + 7);

  const upcomingTasks = projects.flatMap(project =>
    project.tasks?.filter(task =>
      task.dueDate &&
      new Date(task.dueDate) >= today &&
      new Date(task.dueDate) <= nextSevenDays &&
      (task.status === 'ToDo' || task.status === 'InProgress')
    ).map(task => ({ ...task, projectName: project.name })) || []
  ).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget title="Total Projects">
          <p className="text-3xl font-bold text-indigo-600">{totalProjects}</p>
        </DashboardWidget>
        <DashboardWidget title="Total Tasks">
          <p className="text-3xl font-bold text-indigo-600">{totalTasks}</p>
        </DashboardWidget>
        <DashboardWidget title="Tasks To Do">
          <p className="text-3xl font-bold text-red-600">{tasksToDo}</p>
        </DashboardWidget>
        <DashboardWidget title="Tasks In Progress">
          <p className="text-3xl font-bold text-blue-600">{tasksInProgress}</p>
        </DashboardWidget>
      </div>

      <DashboardWidget title="Upcoming Tasks (Next 7 Days)">
        {upcomingTasks.length > 0 ? (
          <ul>
            {upcomingTasks.slice(0, 5).map(task => (
              <li key={task.id} className="mb-2 pb-2 border-b last:border-b-0">
                <Link to={`/projects/${task.projectId}`} className="flex justify-between items-center hover:text-indigo-600">
                  <div>
                    <span className="font-medium">{task.title}</span> in <span className="text-sm text-gray-600">{task.projectName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(task.dueDate!).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming tasks.</p>
        )}
        {upcomingTasks.length > 5 && (
          <p className="text-sm text-gray-500 mt-2">({upcomingTasks.length - 5} more...)</p>
        )}
      </DashboardWidget>

      <DashboardWidget title="Tasks by Status">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-4xl font-bold text-red-600">{tasksToDo}</p>
            <p className="text-md text-red-800">To Do</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-4xl font-bold text-blue-600">{tasksInProgress}</p>
            <p className="text-md text-blue-800">In Progress</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-4xl font-bold text-green-600">{tasksCompleted}</p>
            <p className="text-md text-green-800">Completed</p>
          </div>
        </div>
      </DashboardWidget>
    </div>
  );
};

export default DashboardPage;
