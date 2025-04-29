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
            {viaje === null && <p>Cargando...</p>}

            {/* Error si viaje === undefined */}
            {viaje === undefined && (
                <div>
                    <h1>Error: El tour no fue encontrado</h1>
                    <p>Verifica que el Tipo o ID sea correcto.</p>
                    <button onClick={navegarHomedHandler}>Home</button>
                </div>
            )}

            {/* Detalle si viaje tiene contenido */}
            {viaje && (
                <div>
                    <h1>Detalle</h1>
                    <button onClick={navegarHomedHandler}>Home</button><br /><br />
                    <button onClick={navegarFavoritosdHandler}>Favoritos</button><br /><br />

                    <div>
                        {viaje.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el viaje internacional
                            <div>
                                {/* <img
                                src={viaje.img}
                                alt={viaje.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                                <div>{viaje.id}</div>
                                <div>{viaje.pais}</div>
                                <div>{viaje.ciudad}</div>
                                <div>{viaje.descripcion}</div>
                                <button onClick={() => agregarFavoritos(viaje)}>Agregar Favoritos</button>
                            </div>
                        ) : ( // sino muestra el viaje nacional
                            <div>
                                {/* <img
                                src={viaje.img}
                                alt={viaje.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                                <div>{viaje.id}</div>
                                <div>{viaje.provincia}</div>
                                <div>{viaje.lugares[0]}</div>
                                <div>{viaje.descripcion}</div>
                                <button onClick={() => agregarFavoritos(viaje)}>Agregar Favoritos</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detalle;
