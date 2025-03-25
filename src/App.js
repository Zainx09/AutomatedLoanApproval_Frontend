import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import TopBar from './components/TopBar';
import CheckApproval from './pages/CheckApproval';
import Admin from './pages/Admin';
import HomePage from "./pages/HomePage";
import LoanCalculator from "./pages/LoanCalculatorPage";
import GuidePage from "./pages/GuidePage";

const App = () => (
  <AuthProvider>
    <Router>
      <TopBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/guide" element={<GuidePage />} />

        <Route path="/checkapproval" element={<CheckApproval />} />
        <Route path="/admin" element={<Admin />} />

        {/* Catch-all route to redirect to /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;