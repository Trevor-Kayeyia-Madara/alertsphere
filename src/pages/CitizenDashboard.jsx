import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaUserAlt, FaSearch, FaBell } from 'react-icons/fa';
import axios from 'axios';

const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'citizen') {
      navigate('/');
    } else {
      const fullName = localStorage.getItem('full_name');
      const userId = localStorage.getItem('userId');
      setUser({ fullName, userId });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/notifications/${user.userId}`);
        const data = response.data.notifications || [];
        setNotifications(data.slice(0, 3)); // Show only latest 3
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user?.userId]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex-grow px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {user?.fullName}!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Here you can report crimes, track missing persons, and manage your profile.
        </p>

        {/* Notifications Preview */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
              <FaBell /> Recent Notifications
            </h3>
            <Link to="/notifications" className="text-sm text-blue-500 hover:underline">
              View all
            </Link>
          </div>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li key={notif.id} className="text-sm text-gray-800 border-b pb-2">
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No recent notifications.</p>
          )}
        </div>
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
