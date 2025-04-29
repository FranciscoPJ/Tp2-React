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
        <div>
            <button onClick={navegarHomedHandler}>Home</button><br /><br />

            <h1>Favoritos</h1>
            {viajesFavoritos.length > 0 ?
                (<div>
                    <ListaItem listaItems={viajesFavoritos} eliminarTour={eliminarTour} />
                </div>)
                :
                (<div>
                    <h1>no hay tours seleccionados</h1>
                </div>)
            }
        </div>
    )
}

export default Favorito;
