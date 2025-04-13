// src/pages/ReportsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('https://alertsphere-data.onrender.com/api/reports/'); // adjust to your API base
        setReports(res.data.reports);
      } catch (err) {
        console.error('Error fetching reports:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reported Incidents</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold text-red-600">{report.report_type}</h3>
              <p>{report.description}</p>
              <p className="text-sm text-gray-600">
                Location: {report.location}
              </p>
              <p className="text-xs text-gray-400">
                Reported on {new Date(report.report_date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsPage;
