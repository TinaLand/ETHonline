import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
