import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <p className="text-2xl font-medium text-gray-700 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
