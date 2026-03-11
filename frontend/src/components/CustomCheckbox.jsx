import React from 'react';
import { FiCheck } from 'react-icons/fi';

export default function CustomCheckbox({ 
  name, 
  checked, 
  onChange, 
  label, 
  className = '' 
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-md peer-checked:bg-jo-pink peer-checked:border-jo-pink transition-all group-hover:border-jo-pink/50 flex items-center justify-center">
          {checked && <FiCheck className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
      </div>
      <span className="text-sm font-medium text-jo-dark select-none">
        {label}
      </span>
    </label>
  );
}
