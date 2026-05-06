import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Asegúrate de importar tu componente de Navbar/Cabecera
import { Head } from "./componentes/Head"; 
import { Hero } from "./componentes/Hero";
import { Sessions } from "./routes/Sessions"; 
import { QueEsReiki } from "./routes/QueEsReiki";
import { Contacto } from "./routes/Contacto";
import { AdminTurnos } from "./routes/AdminTurnos";
import { Login } from "./routes/Login";
import { ResetPassword } from "./routes/ResetPassword";
import { SetupAdmin } from "./componentes/SetupAdmin";
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  
  // Si la ruta empieza con /admin, ocultamos el header público
  const esAdmin = location.pathname.startsWith('/admin');

  return (
    <>
    {/* El Header solo se muestra si NO es una ruta de administración */}
      {!esAdmin && <Head/>}
    
      <Routes>
        {/* 2. La página de inicio muestra el Hero */}
        <Route path="/" element={<Hero />} />
        <Route path="/reiki" element={<Sessions />} />
        <Route path="/queesreiki" element={<QueEsReiki />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/adminturnos" element={<AdminTurnos />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/setup" element={<SetupAdmin />} />
      </Routes>
    </>
  );
}

export default App;