import './App.css'

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Detalle from './pages/Detalle/Detalle.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import { ROUTES } from './const/routes';
import { useTranslation } from 'react-i18next'; // si usás i18next

function App() {

  // Componente para manejar rutas similares a 'detalle' y 'favoritos'
  function RutaFlexible() {
    const location = useLocation();
    const { t } = useTranslation(); // para usar t("error404") y t("verificarTipoId")
    const path = location.pathname.toLowerCase().replace(/\s+/g, '');
    const segmentos = path.split('/').filter(Boolean);
  
    const main = segmentos[0] || '';
    const tipo = segmentos[1] || '';
    const id = segmentos[2] || '';
    const [redirigido, setRedirigido] = useState(false);
  
    useEffect(() => {
      if (main === "detalle")  {
        window.location.replace(`/Detalle/${tipo}/${id}`);
        setRedirigido(true);
      } else if (main === "favoritos") {
        window.location.replace("/Favoritos");
        setRedirigido(true);
      }
    }, [main, tipo, id]);
  
    // Si no se redirigió, mostrar error personalizado
    if (!redirigido) {
      return (
        <div className="bg-white p-4 mt-4 rounded-lg shadow">
          <h1 className="text-red-600 text-lg">{t("error404")}</h1>
          <p className="text-red-600 text-lg">{t("verificarTipoId")}</p>
        </div>
      );
    }
  
    return null;
  }

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route element={<Home />} path={ROUTES.home} />
        <Route element={<Detalle />} path={ROUTES.detalle} />
        <Route element={<Favoritos />} path={ROUTES.favoritos} />

        {/* Ruta final: comodín */}
        <Route path="*" element={<RutaFlexible />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
