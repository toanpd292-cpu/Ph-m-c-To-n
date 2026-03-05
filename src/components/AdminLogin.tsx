import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

type AdminLoginProps = {
  onLogin: () => void;
  adminPassword: string;
};

export default function AdminLogin({ onLogin, adminPassword }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === adminPassword) {
      // Lưu session vào localStorage
      localStorage.setItem('adminSession', 'authenticated');
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      setError('');
      onLogin();
    } else {
      setError('❌ Mật khẩu không đúng!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminLoginTime');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Đăng nhập để quản lý sản phẩm</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl space-y-6">
          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              🔐 Mật khẩu Admin
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            🔓 Đăng Nhập
          </button>

          {/* Info */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              💡 Default password: <code className="bg-slate-700 px-2 py-1 rounded">admin123</code>
            </p>
            <p className="text-xs text-slate-400 text-center mt-2">
              ⚠️ Vui lòng đổi mật khẩu sau lần đầu đăng nhập!
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>🛡️ Giao diện này dành riêng cho Admin</p>
          <p className="mt-2">Khách hàng không thể truy cập được</p>
        </div>
      </div>
    </div>
  );
}
