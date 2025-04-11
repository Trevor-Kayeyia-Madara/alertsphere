import React, { useState } from 'react';
import axios from 'axios';

const CrimeReport = () => {
  const [crimeType, setCrimeType] = useState('');
  const [crimeDescription, setCrimeDescription] = useState('');
  const [crimeLocation, setCrimeLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('crime_type', crimeType);
    formData.append('crime_description', crimeDescription);
    formData.append('crime_location', crimeLocation);
    formData.append('date_time_of_incident', dateTime);
    formData.append('reporter_id', localStorage.getItem('userId') || '');

    try {
      const response = await axios.post('http://localhost:5000/api/crime/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage(response.data.message || 'Crime report submitted successfully.');
      setErrorMessage('');
      setCrimeType('');
      setCrimeDescription('');
      setCrimeLocation('');
      setDateTime('');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred while submitting the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">🕵️ Report a Crime</h2>

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
            className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Crime Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrimeReport;
