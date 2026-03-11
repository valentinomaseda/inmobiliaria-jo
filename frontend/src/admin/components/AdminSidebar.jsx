import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiGrid, FiTag, FiLogOut } from 'react-icons/fi';
import { authService } from '../../services/authService';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/propiedades', icon: FiGrid, label: 'Propiedades' },
    { path: '/admin/caracteristicas', icon: FiTag, label: 'Características' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-jo-border">
      <div className="p-6 border-b border-jo-border">
        <Link to="/" className="block">
          <img 
            src="/src/public/logo-png.png" 
            alt="Juliana Ortiz" 
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? 'bg-jo-pink text-white'
                  : 'text-jo-textMuted hover:bg-jo-surface'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-jo-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-jo-textMuted hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <FiLogOut size={20} />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
