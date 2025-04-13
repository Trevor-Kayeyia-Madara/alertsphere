// src/pages/AlertsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('https://alertsphere-data.onrender.com/api/alerts/'); // adjust if different URL
        setAlerts(res.data.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Public Alerts</h2>
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold text-red-600">{alert.alert_type}</h3>
              <p>{alert.alert_content}</p>
              <p className="text-sm text-gray-500">Location: {alert.location}</p>
              <p className="text-xs text-gray-400">
                Posted on {new Date(alert.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPage;
