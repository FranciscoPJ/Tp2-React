import React, { useState } from 'react'

import { ROUTES } from '../../const/routes'; // Ajusta la ruta si es distinta
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Item({ item, eliminarTour }) {
    //const [mostraObjeto, setMostraObjeto] = useState(item);

    const { t, i18n } = useTranslation();

    const navegar = useNavigate();

    const navegarDetalledHandler = (tipo, id) => {
        const ruta = ROUTES.detalle
            .replace(':tipo?', tipo)
            .replace(':id?', id);
        navegar(ruta);
    };

    return (
        <div>
            {item ? (
                <div key={item.id}>
                    {item.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el item internacional
                        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
                            {/* <img
                                src={item.img}
                                alt={item.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                            <div className="text-sky-600 font-bold mb-2">
                                {item.id}
                            </div>
                            <div className="text-gray-800">
                                {item.pais}
                            </div>
                            <div className="text-gray-700">
                                {item.ciudad}
                            </div>
                            <div className="text-gray-600 mb-4">
                                {item.descripcion}
                            </div>
                            <button
                                className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mr-2"
                                onClick={() => navegarDetalledHandler(item.tipo, item.id)}>
                                Ver Detalles
                            </button>
                            {
                                eliminarTour && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => eliminarTour(item.tipo, item.id)}>
                                        Eliminar Tour
                                    </button>
                                )
                            }
                        </div>
                    ) : ( // sino muestra el item nacional
                        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
                            {/* <img
                                src={item.img}
                                alt={item.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                            <div className="text-sky-600 font-bold mb-2">
                                {item.id}
                            </div>
                            <div className="text-gray-800">
                                {item.provincia}
                            </div>
                            <div className="text-gray-700">
                                {item.lugares[0]}
                            </div>
                            <div className="text-gray-600 mb-4">
                                {item.descripcion}
                            </div>
                            <button 
                                className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mr-2"
                                onClick={() => navegarDetalledHandler(item.tipo, item.id)}>
                                Ver Detalles
                            </button>
                            {
                                eliminarTour && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => eliminarTour(item.tipo, item.id)}>
                                        Eliminar Tour
                                    </button>
                                )
                            }
                        </div>
                    )}

                </div>
            )
                :
                (
                    <div>
                        no hay resultado
                    </div>
                )
            }
        </div>
    );
}
