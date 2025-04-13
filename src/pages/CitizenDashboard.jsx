import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaUserAlt, FaSearch, FaBell, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'citizen') {
      navigate('/');
    } else {
      const fullName = localStorage.getItem('full_name');
      const userId = localStorage.getItem('user_id'); // citizenId
      setUser({ fullName, userId });

      fetchNotifications(userId);
      fetchAlerts();
    }
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`https://alertsphere-data.onrender.com/api/notifications/`);
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`https://alertsphere-data.onrender.com/api/alerts/`);
      setAlerts(res.data.alerts || []);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex-grow px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {user?.fullName}!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Here you can report crimes, track missing persons, and manage your profile.
        </p>

        {/* Notifications */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaBell className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">Notifications</h3>
          </div>
          {notifications.length > 0 ? (
            <ul className="bg-white p-4 rounded-md shadow">
              {notifications.map((note, idx) => (
                <li key={idx} className="border-b py-2 last:border-b-0">
                  {note.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No notifications available.</p>
          )}
        </div>

        {/* Alerts */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaBullhorn className="mr-2 text-red-600" />
            <h3 className="text-xl font-semibold text-red-800">Community Alerts</h3>
          </div>
          {alerts.length > 0 ? (
            <ul className="bg-white p-4 rounded-md shadow">
              {alerts.map((alert, idx) => (
                <li key={idx} className="border-b py-2 last:border-b-0">
                  <span className="font-semibold">{alert.title}</span>: {alert.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No alerts at the moment.</p>
          )}
        </div>

        {/* Community Forum */}
        <div
          onClick={() => navigate('/citizen-dashboard/community-forum')}
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 cursor-pointer rounded-md shadow hover:shadow-lg transition mb-12"
        >
          <div className="flex items-center gap-2">
            <FaUsers className="text-xl" />
            <div>
              <h3 className="font-semibold text-lg">Community Forum</h3>
              <p className="text-sm">Discuss safety tips and updates with others.</p>
            </div>
          </div>
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
