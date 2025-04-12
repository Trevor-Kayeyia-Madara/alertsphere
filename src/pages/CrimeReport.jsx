import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const CrimeReport = () => {
  const [crimeType, setCrimeType] = useState('');
  const [crimeDescription, setCrimeDescription] = useState('');
  const [crimeLocation, setCrimeLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Check if the user is logged in as a citizen
    if (!token || role !== 'citizen') {
      alert('You must be logged in as a citizen to report a crime');
      return;
    }

    // Reset error and success messages before submitting
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare the data to be sent in the request body
    const reportData = {
      crime_type: crimeType,
      crime_description: crimeDescription,
      crime_location: crimeLocation,
      date_time_of_incident: dateTime,
      reporter_id: localStorage.getItem('userId') || '', // Ensure this matches the key used in localStorage
    };
    console.log('Report Data:', reportData);

    try {
      // Sending the POST request with the crime report data
      const response = await axios.post('https://alertsphere-data.onrender.com/api/crime/report', reportData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // On success, set the success message and clear the form
      setSuccessMessage(response.data.message || 'Crime report submitted successfully.');
      setErrorMessage('');
      setCrimeType('');
      setCrimeDescription('');
      setCrimeLocation('');
      setDateTime('');

      // Redirect to the citizen dashboard after successful submission
      navigate('/citizen-dashboard');
      console.log('Report data:', reportData);

    } catch (error) {
      // Handle errors, if any
      setErrorMessage(error.response?.data?.error || 'An error occurred while submitting the report.');
      console.error('Backend error response:', error.response);
      
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">🕵️ Report a Crime</h2>

        {/* Display error or success messages */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <strong>Success:</strong> {successMessage}
          </div>
        )}

        {/* Crime report form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Crime Type</label>
            <input
              type="text"
              placeholder="e.g., Theft, Assault"
              value={crimeType}
              onChange={(e) => setCrimeType(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black text-white placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Crime Description</label>
            <textarea
              placeholder="Describe the crime in detail..."
              value={crimeDescription}
              onChange={(e) => setCrimeDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-black text-white placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              value={crimeLocation}
              onChange={(e) => setCrimeLocation(e.target.value)}
              required
              placeholder="Where did it happen?"
              className="w-full px-4 py-3 bg-black text-white placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black text-white placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Submitting...' : 'Submit Crime Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrimeReport;
