import React from 'react';
import { Link } from 'react-router-dom';
import { FaBullhorn, FaUserAlt, FaSearch } from 'react-icons/fa';

const CitizenDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Main content section */}
      <div className="flex-grow px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Citizen Dashboard</h2>
        <p className="text-lg text-gray-600 mb-8">Welcome, valued citizen! Here you can report crimes, track missing persons, and manage your profile.</p>

        {/* Add widgets or more content here */}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-blue-600 shadow-lg py-3 w-full z-10">
        <div className="flex justify-around items-center px-6">
          <Link
            to="/report-crime"
            className="flex flex-col items-center text-white text-sm hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaBullhorn className="text-3xl mb-1 text-white" />
            <span className="text-xs text-white">Report</span>
          </Link>
          <Link
            to="/missing-persons"
            className="flex flex-col items-center text-white text-sm hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaSearch className="text-3xl mb-1 text-white" />
            <span className="text-xs text-white">Missing</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-white text-sm hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaUserAlt className="text-3xl mb-1 text-white" />
            <span className="text-xs text-white">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CitizenDashboard;
