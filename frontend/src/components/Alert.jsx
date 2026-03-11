import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

const Alert = ({ type = 'success', message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrada después de montarse
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duración de la animación de salida
  };

  const types = {
    success: {
      icon: FiCheckCircle,
      bgColor: 'bg-green-500',
      textColor: 'text-green-50',
      borderColor: 'border-green-600'
    },
    error: {
      icon: FiAlertCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-red-50',
      borderColor: 'border-red-600'
    },
    warning: {
      icon: FiAlertTriangle,
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-50',
      borderColor: 'border-yellow-600'
    }
  };

  const config = types[type] || types.success;
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        border-l-4 rounded-lg shadow-premium p-4 flex items-start gap-3
        transition-all duration-300 ease-out min-w-[320px] max-w-md
        ${isVisible && !isExiting ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Cerrar alerta"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Alert;
