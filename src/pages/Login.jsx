import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://alertsphere-data.onrender.com/api/auth/login', { email, password });
      toast.success(response.data.message);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('full_name', response.data.user.full_name);
      localStorage.setItem('userId', response.data.user.user_id);

      if (response.data.role === 'citizen') {
        navigate('/citizen-dashboard');
      } else if (response.data.role === 'law_enforcement') {
        navigate('/officer-dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-200 flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-indigo-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-3 py-2 rounded-md text-gray-800"
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
            className="w-full bg-gray-200 border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg px-3 py-2 rounded-md text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white text-lg font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Login;
