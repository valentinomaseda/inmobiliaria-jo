import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PropertyList from "../components/PropertyList";
import AboutSection from "../components/AboutSection";
import ValuationBanner from "../components/ValuationBanner";
import OfficeLocation from "../components/OfficeLocation";
import { propiedadService } from "../services/propiedadService";
import { imagenService } from "../services/imagenService";

export default function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPropiedades();
  }, []);

  const loadPropiedades = async () => {
    try {
      const response = await propiedadService.getAll({ estado: 'disponible' });
      // Transformar datos del API al formato esperado por los componentes
      const propiedadesTransformadas = (response.data || []).map(prop => {
        const imagenPrincipal = prop.imagenes?.find(img => img.es_principal) || prop.imagenes?.[0];
        
        // Formatear precio con moneda
        const simboloMoneda = prop.moneda === 'USD' ? 'USD ' : prop.moneda === 'ARS' ? 'ARS ' : prop.moneda === 'EUR' ? 'EUR ' : '';
        const precioFormateado = `${simboloMoneda}$${Number(prop.valor).toLocaleString('es-AR')}`;
        
        return {
          id: prop.idPropiedad,
          titulo: prop.nombre,
          ubicacion: `${prop.ciudad || ''}, ${prop.provincia || ''}`.trim().replace(/^,\s*/, ''),
          precio: precioFormateado,
          tipo: prop.operacion === 'venta' ? 'Venta' : prop.operacion === 'alquiler' ? 'Alquiler' : 'Alquiler temporal',
          imagen: imagenPrincipal ? imagenService.getImageUrl(imagenPrincipal.url) : '/placeholder.jpg',
          ambientes: prop.cantAmbientes || 0,
          banos: prop.banos || 0,
          metros: `${prop.metCuad || 0} m²`,
          destacada: false
        };
      });
      setPropiedades(propiedadesTransformadas);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <SearchBar />
      <PropertyList propiedades={propiedades} destacadas={true} />
      <AboutSection />
      <ValuationBanner />
      <OfficeLocation />
    </>
  );
}
