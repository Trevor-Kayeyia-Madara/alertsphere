import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import './App.css';
import CrimeReport from './pages/CrimeReport';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
      <Route path="/officer-dashboard" element={<OfficerDashboard />} />
      <Route path='/report-crime' element={<CrimeReport />} />
    </Routes>
  );
}

export default App;
