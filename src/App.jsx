import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Asegúrate de importar tu componente de Navbar/Cabecera
import { Head } from "./componentes/Head"; 
import { Hero } from "./componentes/Hero";
import { Sessions } from "./routes/Sessions"; 
import { QueEsReiki } from "./routes/QueEsReiki";
import { Contacto } from "./routes/Contacto";

function App() {
  return (
    <BrowserRouter>
      {/* 1. El Navbar va acá: adentro del Router pero afuera de las Routes */}
      <Head /> 

      <Routes>
        {/* 2. La página de inicio muestra el Hero */}
        <Route path="/" element={<Hero />} />

        {/* 3. La página de Reiki muestra las Sesiones */}
        <Route path="/reiki" element={<Sessions />} />
        <Route path="/queesreiki" element={<QueEsReiki />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;