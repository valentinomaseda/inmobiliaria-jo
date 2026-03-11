import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import PropiedadDetalle from './pages/PropiedadDetalle';

// Admin
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/pages/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminPropiedades from './admin/pages/AdminPropiedades';
import AdminPropiedadForm from './admin/pages/AdminPropiedadForm';
import AdminCaracteristicas from './admin/pages/AdminCaracteristicas';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white overflow-x-hidden">
            <Header />
            <Home />
            <Footer />
          </div>
        } />
        <Route path="/catalogo" element={
          <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white overflow-x-hidden">
            <Header />
            <Catalogo />
            <Footer />
          </div>
        } />
        <Route path="/propiedad/:id" element={
          <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white overflow-x-hidden">
            <Header />
            <PropiedadDetalle />
            <Footer />
          </div>
        } />

        {/* Rutas de administración */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="propiedades" element={<AdminPropiedades />} />
          <Route path="propiedades/nueva" element={<AdminPropiedadForm />} />
          <Route path="propiedades/editar/:id" element={<AdminPropiedadForm />} />
          <Route path="caracteristicas" element={<AdminCaracteristicas />} />
        </Route>
      </Routes>
    </Router>
  );
}