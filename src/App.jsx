import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}