import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [operacion, setOperacion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSearch = () => {
    // Navegar al catálogo (los filtros se pueden implementar más adelante)
    navigate('/catalogo');
  };

  return (
    <div className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div 
        className="bg-white shadow-premium rounded-2xl p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        {/* Select Operación */}
        <div className="flex-1 min-w-[140px]">
          <select
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            className="w-full px-4 py-3 bg-transparent text-jo-dark font-medium rounded-lg focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem'
            }}
          >
            <option value="">Operación</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        {/* Divisor vertical (solo desktop) */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Select Ubicación */}
        <div className="flex-1 min-w-[140px]">
          <select
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="w-full px-4 py-3 bg-transparent text-jo-dark font-medium rounded-lg focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem'
            }}
          >
            <option value="">Ubicación</option>
            <option value="arrecifes">Arrecifes</option>
            <option value="lavioleta">La Violeta</option>
            <option value="todd">Todd</option>
            <option value="zona-rural">Zona Rural</option>
          </select>
        </div>

        {/* Divisor vertical (solo desktop) */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Select Tipo */}
        <div className="flex-1 min-w-[180px]">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-3 bg-transparent text-jo-dark font-medium rounded-lg focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem'
            }}
          >
            <option value="">Tipo de propiedad</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="quinta">Quinta</option>
            <option value="terreno">Terreno</option>
            <option value="local">Local Comercial</option>
            <option value="ph">PH</option>
          </select>
        </div>

        {/* Botón de búsqueda */}
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-jo-pink hover:bg-jo-pinkHover text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 group"
        >
          <svg 
            className="w-5 h-5 group-hover:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </div>
  );
}
