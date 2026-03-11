import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiGrid, FiTag, FiLogOut, FiX } from 'react-icons/fi';
import { authService } from '../../services/authService';

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleLinkClick = () => {
    // Cerrar sidebar en móvil al hacer clic en un enlace
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/propiedades', icon: FiGrid, label: 'Propiedades' },
    { path: '/admin/caracteristicas', icon: FiTag, label: 'Características' },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-jo-darkSurface border-r border-jo-darkBorder z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header del sidebar */}
        <div className="p-6 border-b border-jo-darkBorder flex justify-between items-center">
          <Link to="/" className="block">
            <img 
              src="/src/public/logo-png.png" 
              alt="Juliana Ortiz" 
              className="h-12 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-jo-darkTextMuted hover:text-jo-darkText transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'bg-jo-pink text-white'
                    : 'text-jo-darkTextMuted hover:bg-jo-darkCard'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón de logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-jo-darkBorder">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-jo-darkTextMuted hover:bg-red-900/20 hover:text-red-400 transition-all w-full"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
