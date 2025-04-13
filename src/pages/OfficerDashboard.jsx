import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OfficerDashboard = () => {
  const [crimeAnalytics, setCrimeAnalytics] = useState({});
  const [missingPersonAnalytics, setMissingPersonAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch crime analytics data
    const fetchCrimeAnalytics = async () => {
      try {
        const response = await fetch('https://alertsphere-data.onrender.com/api/analytics/crime');
        const data = await response.json();
        if (data.crimeAnalytics) {
          setCrimeAnalytics(data.crimeAnalytics);
        }
      } catch (error) {
        console.error('Error fetching crime analytics:', error);
      }
    };

    // Fetch missing person analytics data
    const fetchMissingPersonAnalytics = async () => {
      try {
        const response = await fetch('https://alertsphere-data.onrender.com/api/analytics/missing');
        const data = await response.json();
        if (data.missingPersonAnalytics) {
          setMissingPersonAnalytics(data.missingPersonAnalytics);
        }
      } catch (error) {
        console.error('Error fetching missing person analytics:', error);
      }
    };

    // Fetch analytics data
    fetchCrimeAnalytics();
    fetchMissingPersonAnalytics();

    // Stop loading after fetching data
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Law Enforcement Dashboard</h2>
        <p className="text-gray-700 text-lg">Welcome, Officer.</p>

        {/* Loading State */}
        {loading ? (
          <p>Loading analytics...</p>
        ) : (
          <>
            {/* Crime Analytics */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700">Crime Analytics</h3>
              <ul className="list-disc ml-6">
                {Object.entries(crimeAnalytics).map(([crimeType, count]) => (
                  <li key={crimeType} className="text-gray-700">
                    {crimeType}: {count}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Person Analytics */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700">Missing Person Analytics</h3>
              <ul className="list-disc ml-6">
                {Object.entries(missingPersonAnalytics).map(([status, count]) => (
                  <li key={status} className="text-gray-700">
                    {status}: {count}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
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
        <Link
          to="/update-status"
          className="flex flex-col items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <span className="text-xl mb-1">🛠️</span>
          <span>Update Status</span>
        </Link>
      </nav>
    </div>
  );
};

export default OfficerDashboard;
