import React, { useState, useEffect } from 'react';
import AdminAuth from '../components/AdminAuth';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProductManager, setShowProductManager] = useState(false);

  useEffect(() => {
    // Kiểm tra đã đăng nhập chưa
    const isAuth = localStorage.getItem('adminAuth') === 'authenticated';
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowProductManager(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminSession');
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
