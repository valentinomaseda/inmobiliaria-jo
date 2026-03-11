import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from './CustomSelect';

export default function SearchBar() {
  const navigate = useNavigate();
  const [operacion, setOperacion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSearch = () => {
    // Construir query params para los filtros
    const params = new URLSearchParams();
    if (operacion) params.append('operacion', operacion);
    if (ubicacion) params.append('ubicacion', ubicacion);
    if (tipo) params.append('tipo', tipo);
    
    // Navegar al catálogo con los filtros
    navigate(`/catalogo${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="relative -mt-6 z-20 max-w-[1400px] mx-auto px-4 sm:px-6">
      <div 
        className="bg-white shadow-premium rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        {/* Select Operación */}
        <div className="flex-1 min-w-[140px]">
          <CustomSelect
            name="operacion"
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            placeholder="Operación"
            options={[
              { value: '', label: 'Operación' },
              { value: 'venta', label: 'Venta' },
              { value: 'alquiler', label: 'Alquiler' }
            ]}
          />
        </div>

        {/* Divisor vertical (solo desktop) */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Select Ubicación */}
        <div className="flex-1 min-w-[140px]">
          <CustomSelect
            name="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            placeholder="Ubicación"
            options={[
              { value: '', label: 'Ubicación' },
              { value: 'arrecifes', label: 'Arrecifes' },
              { value: 'lavioleta', label: 'La Violeta' },
              { value: 'todd', label: 'Todd' },
              { value: 'zona-rural', label: 'Zona Rural' }
            ]}
          />
        </div>

        {/* Divisor vertical (solo desktop) */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Select Tipo */}
        <div className="flex-1 min-w-[220px]">
          <CustomSelect
            name="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo de propiedad"
            options={[
              { value: '', label: 'Tipo de propiedad' },
              { value: 'casa', label: 'Casa' },
              { value: 'departamento', label: 'Departamento' },
              { value: 'quinta', label: 'Quinta' },
              { value: 'terreno', label: 'Terreno' },
              { value: 'local', label: 'Local' },
              { value: 'oficina', label: 'Oficina' },
              { value: 'galpon', label: 'Galpón' }
            ]}
          />
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
