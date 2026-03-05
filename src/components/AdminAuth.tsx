import React, { useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

type AdminAuthProps = {
  onLogin: () => void;
};

export default function AdminAuth({ onLogin }: AdminAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'Admin@123456',
    fullName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mô phỏng authentication (thực tế sẽ call Supabase)
      if (isLogin) {
        // Login check
        if (formData.email === 'admin@example.com' && formData.password === 'Admin@123456') {
          localStorage.setItem('adminSession', JSON.stringify({
            email: formData.email,
            role: 'admin',
            loginTime: new Date().toISOString(),
          }));
          localStorage.setItem('adminAuth', 'authenticated');
          onLogin();
        } else {
          setError('❌ Email hoặc mật khẩu không đúng!');
        }
      } else {
        // Register check
        if (!formData.fullName.trim()) {
          setError('❌ Vui lòng nhập tên đầy đủ!');
          return;
        }
        if (formData.password.length < 8) {
          setError('❌ Mật khẩu phải có ít nhất 8 ký tự!');
          return;
        }
        // Thực tế sẽ save vào Supabase
        localStorage.setItem('adminSession', JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          role: 'admin',
          loginTime: new Date().toISOString(),
        }));
        localStorage.setItem('adminAuth', 'authenticated');
        onLogin();
      }
    } catch (err) {
      setError('❌ Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Hệ thống quản lý chuyên nghiệp</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? '🔐 Đăng Nhập' : '✍️ Đăng Ký'}
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Full Name (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                👤 Tên đầy đủ
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên của bạn..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              📧 Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              🔐 Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                {isLogin ? '🔓 Đăng Nhập' : '✍️ Đăng Ký'}
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Toggle between Login/Register */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    email: 'admin@example.com',
                    password: 'Admin@123456',
                    fullName: '',
                  });
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold transition"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-xs text-blue-300">
            <p className="font-semibold mb-2">💡 Demo Credentials:</p>
            <p>Email: <code className="bg-slate-700 px-2 py-1 rounded">admin@example.com</code></p>
            <p>Password: <code className="bg-slate-700 px-2 py-1 rounded">Admin@123456</code></p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>🛡️ Hệ thống được bảo mật toàn bộ</p>
          <p className="mt-2">© 2024 Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
