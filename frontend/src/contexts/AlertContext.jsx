import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    const alert = { id, message, type };
    
    setAlerts(prev => [...prev, alert]);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 5000);
    
    return id;
  }, []);

  const success = useCallback((message) => showAlert(message, 'success'), [showAlert]);
  const error = useCallback((message) => showAlert(message, 'error'), [showAlert]);
  const warning = useCallback((message) => showAlert(message, 'warning'), [showAlert]);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, success, error, warning, removeAlert }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
