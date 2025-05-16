import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProcedureProvider } from './contexts/ProcedureContext';
import { initializeAdmin } from './utils/localStorage';

function App() {
  useEffect(() => {
    // Initialize default admin user if not exists
    initializeAdmin();
  }, []);

  return (
    <AuthProvider>
      <ProcedureProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ProcedureProvider>
    </AuthProvider>
  );
}

export default App;