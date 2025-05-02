import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router';

import Detalle from './pages/Detalle/Detalle.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import {ROUTES} from './const/routes';

function App() {
  return(
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route element={<Home />} path={ROUTES.home} />
        <Route element={<Detalle />} path={ROUTES.detalle} />
        <Route element={<Favoritos />} path={ROUTES.favoritos}  />        
      </Routes>

      <Footer/>
      
    </BrowserRouter>
  )
}

export default App
