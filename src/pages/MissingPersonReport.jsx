import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MissingPersonReport = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateMissing, setDateMissing] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      missing_person_name: name,
      age,
      physical_description: description,
      last_known_location: location,
      date_of_disappearance: dateMissing,
      reporter_id: localStorage.getItem('userId'),
    };

    try {
      const response = await axios.post('https://alertsphere-data.onrender.com/api/missing/report', payload);
      setSuccessMessage(response.data.message);
      setErrorMessage('');

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/citizen-dashboard');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-amber-800 mb-10">Report a Missing Person</h2>

      <div className="max-w-2xl mx-auto w-full bg-white shadow-lg rounded-2xl p-8">
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
            <label className="block text-lg font-medium text-gray-800 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Age</label>
            <input
              type="number"
              placeholder="e.g. 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Physical Description</label>
            <textarea
              placeholder="Describe physical features, clothing, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Last Known Location</label>
            <input
              type="text"
              placeholder="e.g. Nairobi CBD"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Date of Disappearance</label>
            <input
              type="date"
              value={dateMissing}
              onChange={(e) => setDateMissing(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white text-lg transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MissingPersonReport;
