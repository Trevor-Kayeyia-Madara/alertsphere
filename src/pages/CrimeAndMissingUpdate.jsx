import React, { useState, useEffect } from 'react';

const CrimeAndMissingUpdate = () => {
  const [crimes, setCrimes] = useState([]);
  const [missingPersons, setMissingPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching crime reports
    const fetchCrimes = async () => {
      try {
        const response = await fetch('https://alertsphere-data.onrender.com/api/crime/');
        const data = await response.json();
        if (data.crimes) {
          setCrimes(data.crimes);
        }
      } catch (error) {
        console.error('Error fetching crime reports:', error);
      }
    };

    // Fetching missing persons
    const fetchMissingPersons = async () => {
      try {
        const response = await fetch('https://alertsphere-data.onrender.com/api/missing/missing');
        const data = await response.json();
        if (data.missingPersons) {
          setMissingPersons(data.missingPersons);
        }
      } catch (error) {
        console.error('Error fetching missing person reports:', error);
      }
    };

    // Fetching data
    fetchCrimes();
    fetchMissingPersons();

    setLoading(false);
  }, []);

  // Function to handle crime status update
  const updateCrimeStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(`https://alertsphere-data.onrender.com/api/crime/${reportId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      } else {
        alert('Error updating crime status');
      }
    } catch (error) {
      console.error('Error updating crime status:', error);
    }
  };

  // Function to handle missing person status update
  const updateMissingPersonStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(`https://alertsphere-data.onrender.com/api/missing/${reportId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      } else {
        alert('Error updating missing person status');
      }
    } catch (error) {
      console.error('Error updating missing person status:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Crime & Missing Person Status Update</h2>
        <p className="text-gray-700 text-lg">Update crime and missing person reports below.</p>

        {/* Loading State */}
        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <>
            {/* Crime Status Update */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700">Crime Reports</h3>
              <ul className="list-disc ml-6">
                {crimes.map((crime) => (
                  <li key={crime.report_id} className="text-gray-700">
                    {crime.crime_type} - Status: {crime.status}
                    {/* Update crime status button */}
                    <button
                      onClick={() => updateCrimeStatus(crime.report_id, 'Resolved')}
                      className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                      Mark as Resolved
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Person Status Update */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700">Missing Person Reports</h3>
              <ul className="list-disc ml-6">
                {missingPersons.map((person) => (
                  <li key={person.report_id} className="text-gray-700">
                    {person.name} - Status: {person.status}
                    {/* Update missing person status button */}
                    <button
                      onClick={() => updateMissingPersonStatus(person.report_id, 'Found')}
                      className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                      Mark as Found
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CrimeAndMissingUpdate;
