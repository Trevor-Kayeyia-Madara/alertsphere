import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import './App.css';
import CrimeReport from './pages/CrimeReport';
import MissingPersonReport from './pages/MissingPersonReport';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import CommunityForum from './pages/CommunityForum';
import VerificationPage from './pages/VerificationPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
      <Route path="/officer-dashboard" element={<OfficerDashboard />} />
      <Route path='/report-crime' element={<CrimeReport />} />
      <Route path='/missing-persons' element={<MissingPersonReport />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/citizen-dashboard/community-forum' element={<CommunityForum />} />
      <Route path='/officer-verification' element={<VerificationPage  />} />
      <Route path='/alerts' element={<AlertsPage />} />
      <Route path='/reports' element={<ReportsPage />} />
    </Routes>
  );
}

export default App;
