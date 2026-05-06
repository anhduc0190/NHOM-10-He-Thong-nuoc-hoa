import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Users, FileBarChart, LogOut } from 'lucide-react';
import { logout, getCurrentUser } from '../utils/auth';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Shop Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.username || 'Admin'}
          </p>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all">
            <ShoppingCart className="h-5 w-5" />
            <span>Bán hàng</span>
          </Link>
          
          <Link to="/products" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all">
            <span>📦</span>
            <span>Sản phẩm</span>
          </Link>
          
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all">
            <Users className="h-5 w-5" />
            <span>Khách hàng</span>
          </Link>
          
          <Link to="/reports" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all">
            <FileBarChart className="h-5 w-5" />
            <span>Báo cáo</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;