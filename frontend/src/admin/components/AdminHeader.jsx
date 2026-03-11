import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { authService } from '../../services/authService';

export default function AdminHeader({ onMenuClick }) {
  const admin = authService.getAdmin();

  return (
    <header className="bg-jo-darkSurface border-b border-jo-darkBorder px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Botón hamburguesa para móvil */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-jo-darkText hover:text-jo-pink transition-colors"
          >
            <FiMenu size={24} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-jo-darkText">
              Panel de Administración
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-jo-darkText">
              {admin?.nombre || 'Administrador'}
            </p>
            <p className="text-xs text-jo-darkTextMuted">{admin?.email}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-jo-pink rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {(admin?.nombre || 'A')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
