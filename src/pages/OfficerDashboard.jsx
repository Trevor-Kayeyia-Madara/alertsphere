import React from 'react';
import { Link } from 'react-router-dom';

const OfficerDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Law Enforcement Dashboard</h2>
        <p className="text-gray-700 text-lg">Welcome, Officer.</p>

        {/* Additional dashboard content can be added here */}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-2">
        <Link
          to="/reports"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <span className="text-xl mb-1">📂</span>
          <span>Reports</span>
        </Link>
        <Link
          to="/alerts"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <span className="text-xl mb-1">🚨</span>
          <span>Alerts</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <span className="text-xl mb-1">👮‍♂️</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default OfficerDashboard;
