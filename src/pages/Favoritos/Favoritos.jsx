import React, { useEffect, useState } from 'react';

import ListaItem from '../../components/ListaItem/ListaItem';
import { useTranslation } from 'react-i18next';

function Favoritos() {

    const favoritosGuardadas = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [viajesFavoritos, setViajesFavoritos] = useState(favoritosGuardadas);
    const { t } = useTranslation();

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

            <h1 className="text-3xl font-bold text-gray-700 mb-4">{t('favorites')}</h1>
            {viajesFavoritos.length > 0 ?
                (<div>
                    <ListaItem listaItems={viajesFavoritos} eliminarTour={eliminarTour} />
                </div>)
                :
                (<div>
                    <h1 className="text-slate-700 text-lg">{t('noTours')}</h1>
                </div>)
            }
        </div>
    )
}

export default Favoritos;
