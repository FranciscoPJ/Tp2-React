import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //  OJO: es "react-router-dom", no "react-router"

import { ROUTES } from "../../const/routes";

function Detalle() {
    const favoritosGuardadas = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [viajesFavoritos, setViajesFavoritos] = useState(favoritosGuardadas);
    const [viaje, setViaje] = useState(null); // Inicializar como null porque viene un solo objeto
    const { tipo, id } = useParams(); // Nos da el id que viene en la URL

    const navegar = useNavigate();

    const navegarHomedHandler = () => {
        navegar(ROUTES.home);
    };

    const navegarFavoritosdHandler = () => {
        navegar(ROUTES.favoritos);
    };

    const getViajesInternacionales = async () => {
        try {
            const respuesta = await fetch(
                `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_internacionales/${id}`
            );

            const data = await respuesta.json();

            if (!respuesta.ok || !data || !data.id) {
                setViaje(undefined); // El tour con ID ${id} no fue encontrado
            } else {
                setViaje(data);
            }

        } catch (error) {
            console.log("@@@@, Error, no funciona tours internacionales: \n", error);
        }
    };

    const getViajesNacionales = async () => { // me traigo la api de tours nacionales
        try {
            const respuesta = await fetch(
                `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_nacionales/${id}`
            );
            const data = await respuesta.json();

            if (!respuesta.ok || !data || !data.id) {
                setViaje(undefined); // El tour con ID ${id} no fue encontrado
            } else {
                setViaje(data);
            }

            // console.log("Nacionales:", viajesNacionales);
        } catch (error) {
            console.log("@@@@, Error, no funciona tours nacionales: \n", error);
        }
    };

    useEffect(() => {
        if (!id || !tipo) {
            console.log("@@@@, Error: Falta tipo o id en la URL");
            setViaje(undefined);
            return;
        }

        if (tipo === "internacional") {
            getViajesInternacionales();
        } else if (tipo === "nacional") {
            getViajesNacionales();
        } else {
            console.log("@@@@, Error: Tipo inválido en la URL");
            setViaje(undefined);
        }

        localStorage.setItem("favoritos", JSON.stringify(viajesFavoritos));

    }, [id, tipo, viajesFavoritos]); // Mejor poner [id, tipo] en dependencias, por si cambia el id

    // funcion que agregar un tour en la pagina "favoritos"
    const agregarFavoritos = (tour) => {
        const yaExiste = viajesFavoritos.some(
            (fav) => fav.id === tour.id && fav.tipo === tipo
        );

        if (!yaExiste) {
            const nuevosFavoritos = [...viajesFavoritos, { ...tour, tipo }];
            setViajesFavoritos(nuevosFavoritos);
            localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
        } else {
            console.log("Ya está en favoritos");
        }
    };


    return (
        <div>
            {/* Cargando... si viaje === null */}
            {viaje === null && 
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <p className="text-6xl font-bold text-gray-700">Cargando...</p>
                </div>
            }

            {/* Error si viaje === undefined */}
            {viaje === undefined && (
                <div className="bg-white p-4 mt-4 rounded-lg shadow">
                    <h1 className="text-red-600 text-lg">Error 404: El tour no fue encontrado</h1>
                    <p className="text-red-600 text-lg">Verifica que el Tipo o ID sea correcto.</p>
                    <button
                        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
                        onClick={navegarHomedHandler}>
                        Home
                    </button>
                </div>
            )}

            {/* Detalle si viaje tiene contenido */}
            {viaje && (
                <div className="bg-gray-100 min-h-screen p-6">

                    <h1 className="text-3xl font-bold text-sky-700 mb-4">Detalles del Tour</h1>

                    <button
                        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 mr-2"
                        onClick={navegarHomedHandler}>
                        Home
                    </button>

                    <button
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                        onClick={navegarFavoritosdHandler}>
                        Favoritos
                    </button>

                    <div className="bg-white p-4 mt-4 rounded-lg shadow">
                        {viaje.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el viaje internacional
                            <div>
                                {/* <img
                                src={viaje.img}
                                alt={viaje.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                                <div className="text-lg font-semibold text-gray-800">{viaje.id}</div>
                                <div className="text-gray-700 mb-2">{viaje.pais}</div>
                                <div className="text-gray-700 mb-2">{viaje.ciudad}</div>
                                <div className="text-gray-600 mb-4">{viaje.descripcion}</div>
                                <button
                                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mr-2"
                                    onClick={() => agregarFavoritos(viaje)}>
                                    Agregar Favoritos
                                </button>
                            </div>
                        ) : ( // sino muestra el viaje nacional
                            <div>
                                {/* <img
                                src={viaje.img}
                                alt={viaje.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                                <div className="text-lg font-semibold text-gray-800">{viaje.id}</div>
                                <div className="text-gray-700 mb-2">{viaje.provincia}</div>
                                <div className="text-gray-700 mb-2">{viaje.lugares[0]}</div>
                                <div className="text-gray-600 mb-4">{viaje.descripcion}</div>
                                <button
                                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mr-2"
                                    onClick={() => agregarFavoritos(viaje)}>
                                    Agregar Favoritos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detalle;
