import React from 'react';
import { authService } from '../../services/authService';

export default function AdminHeader() {
  const admin = authService.getAdmin();

  return (
    <header className="bg-jo-darkSurface border-b border-jo-darkBorder px-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-jo-darkText">
            Panel de Administración
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-jo-darkText">
              {admin?.nombre || 'Administrador'}
            </p>
            <p className="text-xs text-jo-darkTextMuted">{admin?.email}</p>
          </div>
          <div className="w-10 h-10 bg-jo-pink rounded-full flex items-center justify-center text-white font-bold">
            {(admin?.nombre || 'A')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
