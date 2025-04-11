import React from 'react';
import { Link } from 'react-router-dom';
import { FaBullhorn, FaUserAlt, FaSearch } from 'react-icons/fa';

const CitizenDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Citizen Dashboard</h2>
        <p className="text-gray-700 text-lg">Welcome, valued citizen!</p>

        {/* You can add widgets/components here later */}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-2">
        <Link
          to="/report-crime"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <FaBullhorn className="text-xl mb-1" />
          <span>Report</span>
        </Link>
        <Link
          to="/missing-persons"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <FaSearch className="text-xl mb-1" />
          <span>Missing</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <FaUserAlt className="text-xl mb-1" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default CitizenDashboard;
