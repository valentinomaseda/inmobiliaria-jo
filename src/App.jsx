import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import PropiedadDetalle from './pages/PropiedadDetalle';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/propiedad/:id" element={<PropiedadDetalle />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}