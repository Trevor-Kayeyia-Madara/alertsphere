import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert(response.data.message);

      // Save the token, role, and username to localStorage
      localStorage.setItem('token', response.data.token);  // Save the token
      localStorage.setItem('role', response.data.role);    // Save the role
      localStorage.setItem('full_name', response.data.user.full_name);  // Save the full name
      localStorage.setItem('userId', response.data.user.user_id); // Save user_id (this is important)

      console.log(localStorage.getItem('userId')); // Check if userId is correctly stored

      // Redirect based on the role
      if (response.data.role === 'citizen') {
        navigate('/citizen-dashboard');
      } else if (response.data.role === 'law_enforcement') {
        navigate('/officer-dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-200 flex justify-center items-center py-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-indigo-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-indigo-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-4 py-3 rounded-md text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
