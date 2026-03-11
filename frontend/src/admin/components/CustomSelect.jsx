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
        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base bg-jo-darkCard border border-jo-darkBorder text-jo-darkText rounded-lg hover:border-jo-pink/50 focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none transition-all flex items-center justify-between group"
      >
        <span className={!selectedOption ? 'text-jo-darkTextMuted' : ''}>
          {displayText}
        </span>
        <FiChevronDown 
          className={`w-4 h-4 text-jo-darkTextMuted group-hover:text-jo-pink transition-all ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-jo-darkCard border border-jo-darkBorder rounded-lg shadow-premium-dark overflow-hidden">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-jo-pink/10 transition-colors flex items-center justify-between group ${
                  value === option.value ? 'bg-jo-pink/20 text-jo-pink' : 'text-jo-darkText'
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
