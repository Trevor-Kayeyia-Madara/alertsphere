/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [officerVerification, setOfficerVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the officer's current verification data
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (!userId || !token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVerificationStatus(response.data.verification_status || false);
        setOfficerVerification(response.data.officer_verification || false);
        setLoading(false);
      } catch (error) {
        alert('Error fetching verification status');
        navigate('/');
      }
    };

    fetchVerificationStatus();
  }, [navigate]);

  const handleUpdateVerification = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/officer/${userId}`,
        {
          verification_status: verificationStatus,
          officer_verification: officerVerification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert('Failed to update verification status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-200 flex justify-center items-center py-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Officer Verification</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="verification_status" className="block text-lg font-medium text-indigo-700">
              Verification Status
            </label>
            <input
              type="checkbox"
              id="verification_status"
              checked={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.checked)}
              className="text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="officer_verification" className="block text-lg font-medium text-indigo-700">
              Officer Verification
            </label>
            <input
              type="checkbox"
              id="officer_verification"
              checked={officerVerification}
              onChange={(e) => setOfficerVerification(e.target.checked)}
              className="text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleUpdateVerification}
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Update Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
