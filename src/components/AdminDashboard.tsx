import React, { useState, useEffect } from 'react';
import { BarChart3, ShoppingCart, Package, TrendingUp, Users, LogOut, Settings, Bell, Search, MessageCircle } from 'lucide-react';
import CustomerManagement from './CustomerManagement';

type AdminDashboardProps = {
  onLogout: () => void;
};

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
    recentOrders: [] as any[],
    adminInfo: {} as any,
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Mô phỏng load stats từ Supabase
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Thực tế sẽ call Supabase API
    setStats({
      totalProducts: 12,
      totalOrders: 45,
      totalRevenue: 5250000,
      totalViews: 3420,
      recentOrders: [
        {
          id: '1',
          customerName: 'Nguyễn Văn A',
          product: 'Áo Thun Nam',
          total: 150000,
          status: 'completed',
          date: '2024-03-05'
        },
        {
          id: '2',
          customerName: 'Trần Thị B',
          product: 'Quần Jean',
          total: 350000,
          status: 'pending',
          date: '2024-03-04'
        },
        {
          id: '3',
          customerName: 'Lê Văn C',
          product: 'Giày Thể Thao',
          total: 450000,
          status: 'completed',
          date: '2024-03-03'
        },
      ],
      adminInfo: {
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'Admin',
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminSession');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-slate-800/50 border-r border-slate-700 backdrop-blur-xl p-6 space-y-8">
        {/* Logo */}
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-xs text-slate-400">Professional Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: BarChart3 },
            { id: 'products', label: '📦 Sản phẩm', icon: Package },
            { id: 'customers', label: '💬 Liên Hệ Khách Hàng', icon: MessageCircle },
            { id: 'users', label: '👥 Người dùng', icon: Users },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* User Info */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <p className="text-xs text-slate-400 mb-1">Đăng nhập dưới tên</p>
          <p className="font-semibold truncate">{stats.adminInfo.name}</p>
          <p className="text-xs text-slate-400 truncate">{stats.adminInfo.email}</p>
          <button
            onClick={handleLogout}
            className="w-full mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              {activeTab === 'dashboard' && '📊 Dashboard'}
              {activeTab === 'orders' && '🛒 Quản lý Đơn hàng'}
              {activeTab === 'products' && '📦 Quản lý Sản phẩm'}
              {activeTab === 'users' && '👥 Quản lý Người dùng'}
              {activeTab === 'reports' && '📈 Báo cáo'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
              <Bell size={20} />
            </button>
            <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Tổng Sản phẩm',
                  value: stats.totalProducts,
                  icon: Package,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-500/10',
                  textColor: 'text-blue-400',
                },
                {
                  title: 'Tổng Đơn hàng',
                  value: stats.totalOrders,
                  icon: ShoppingCart,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-500/10',
                  textColor: 'text-purple-400',
                },
                {
                  title: 'Tổng Doanh thu',
                  value: `${(stats.totalRevenue / 1000000).toFixed(1)}M`,
                  icon: TrendingUp,
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'bg-green-500/10',
                  textColor: 'text-green-400',
                },
                {
                  title: 'Tổng Lượt xem',
                  value: stats.totalViews,
                  icon: Users,
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'bg-orange-500/10',
                  textColor: 'text-orange-400',
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`${stat.bgColor} border border-slate-600/30 rounded-2xl p-6 hover:border-slate-600 transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6">📋 Đơn hàng gần đây</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400">Khách hàng</th>
                      <th className="text-left py-3 px-4 text-slate-400">Sản phẩm</th>
                      <th className="text-left py-3 px-4 text-slate-400">Giá</th>
                      <th className="text-left py-3 px-4 text-slate-400">Trạng thái</th>
                      <th className="text-left py-3 px-4 text-slate-400">Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                        <td className="py-3 px-4">{order.customerName}</td>
                        <td className="py-3 px-4">{order.product}</td>
                        <td className="py-3 px-4 font-semibold text-green-400">
                          {order.total.toLocaleString('vi-VN')} VND
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {order.status === 'completed' ? '✓ Hoàn thành' : '⏳ Chờ xử lý'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6">📈 Xu hướng doanh thu</h3>
              <div className="h-64 bg-slate-700/20 rounded-lg flex items-center justify-center text-slate-400">
                <p>📊 Biểu đồ sẽ hiển thị tại đây</p>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-6">📦 Quản Lý Sản Phẩm</h3>
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400 mb-4">Chuyển tới /admin-products để quản lý sản phẩm</p>
                <a href="/admin-products" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors inline-block">
                  Quản Lý Sản Phẩm →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <CustomerManagement />
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'customers' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center backdrop-blur-xl">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-bold mb-2">Trang này đang được phát triển</h3>
            <p className="text-slate-400">Quay lại trang Dashboard để xem tổng quan hệ thống</p>
          </div>
        )}
      </div>
    </div>
  );
}
