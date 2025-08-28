import React, { ReactNode } from 'react';

interface DashboardWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default DashboardWidget;
