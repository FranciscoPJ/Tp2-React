import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"; //  OJO: es "react-router-dom", no "react-router"

import ListaItem from '../../components/ListaItem/ListaItem';
import { ROUTES } from '../../const/routes';

function Favorito() {

    const favoritosGuardadas = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [viajesFavoritos, setViajesFavoritos] = useState(favoritosGuardadas);

    const navegar = useNavigate();

    const navegarHomedHandler = () => {
        navegar(ROUTES.home);
    }

    const navegarDetalledHandler = () => {
        navegar(ROUTES.detalle);
    }

    // Funcion que elimina un tour basado en tipo e id
    const eliminarTour = (tipo, id) => {
        const nuevaListaFavoritos = viajesFavoritos.filter(tour => !(tour.id === id && tour.tipo === tipo)); // Filtra por tipo e id
        setViajesFavoritos(nuevaListaFavoritos);

        // También puedes actualizar el localStorage si es necesario
        localStorage.setItem("favoritos", JSON.stringify(nuevaListaFavoritos));
    };


    // Guardar en localStorage cada vez que cambian porVer o vistas
    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(viajesFavoritos));
    }, [viajesFavoritos]);


    return (
        <div className="bg-gray-100 min-h-screen p-6">
            
            <button 
                className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
                onClick={navegarHomedHandler}>
                Home
            </button>

            <h1 className="text-2xl font-bold text-emerald-700 mt-4 mb-4">Favoritos</h1>
            {viajesFavoritos.length > 0 ?
                (<div>
                    <ListaItem listaItems={viajesFavoritos} eliminarTour={eliminarTour} />
                </div>)
                :
                (<div>
                    <h1 className="text-slate-700 text-lg">No hay tours seleccionados...</h1>
                </div>)
            }
        </div>
    )
}

export default Favorito;
