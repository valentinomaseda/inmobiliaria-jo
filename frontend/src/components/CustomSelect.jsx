import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

export default function CustomSelect({ 
  name, 
  value, 
  onChange, 
  options, 
  placeholder = 'Seleccionar...', 
  className = '',
  required = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Obtener la opción seleccionada
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-base bg-white border border-gray-200 text-jo-dark rounded-lg hover:border-jo-pink/50 hover:bg-gray-50 focus:ring-2 focus:ring-jo-pink/20 focus:border-jo-pink outline-none transition-all flex items-center justify-between group"
      >
        <span className={!selectedOption ? 'text-gray-500' : 'font-medium'}>
          {displayText}
        </span>
        <FiChevronDown 
          className={`w-5 h-5 text-gray-400 group-hover:text-jo-pink transition-all ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-premium overflow-hidden">
          <div className="max-h-60 overflow-y-auto custom-scrollbar-light">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-jo-pink/5 hover:text-jo-pink transition-colors flex items-center justify-between group ${
                  value === option.value ? 'bg-jo-pink/10 text-jo-pink font-medium' : 'text-jo-dark'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <FiCheck className="w-4 h-4 text-jo-pink" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
