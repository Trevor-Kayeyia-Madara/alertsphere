import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'citizen',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message); // Show success message
      navigate('/'); // Navigate to the home page after successful registration
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-200 flex justify-center items-center py-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-lg font-medium text-indigo-700">Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-indigo-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-lg font-medium text-indigo-700">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-indigo-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-lg font-medium text-indigo-700">Role</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            >
              <option value="citizen">Citizen</option>
              <option value="law_enforcement">Law Enforcement</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
