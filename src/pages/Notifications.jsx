import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaBell } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    if (!token || role !== 'citizen') {
      navigate('/');
    } else {
      fetchNotifications(userId);
    }
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`https://alertsphere-data.onrender.com/api/notifications/`);
      const data = response.data.notifications || [];
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 text-xl mr-3"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <FaBell /> Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="border-b pb-2 last:border-b-0 text-gray-700"
            >
              <p>{notif.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(notif.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no notifications at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
