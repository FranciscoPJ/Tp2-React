import React, { useState } from 'react'

import { ROUTES } from '../../const/routes'; // Ajusta la ruta si es distinta
import { useNavigate } from 'react-router';

export default function Item({ item, eliminarTour }) {
    //const [mostraObjeto, setMostraObjeto] = useState(item);

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
                <div>
                    {item.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el item internacional
                        <div>
                            {/* <img
                                src={item.img}
                                alt={item.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                            <div>{item.id}</div>
                            <div>{item.pais}</div>
                            <div>{item.ciudad}</div>
                            <div>{item.descripcion}</div>
                            <br />{/* espaciado entre items */}
                            <button onClick={() => navegarDetalledHandler(item.tipo, item.id)}>Ver Detalles</button> 
                            {
                                eliminarTour && (
                                    <button onClick={() => eliminarTour(item.tipo, item.id)}>Eliminar Tour</button>
                                )
                            }
                        </div>
                    ) : ( // sino muestra el item nacional
                        <div>
                            {/* <img
                                src={item.img}
                                alt={item.title}
                                style={{ maxWidth: '80%' }}
                            /> */}
                            <div>{item.id}</div>
                            <div>{item.provincia}</div>
                            <div>{item.lugares[0]}</div>
                            <div>{item.descripcion}</div>
                            <br />
                            <button onClick={() => navegarDetalledHandler(item.tipo, item.id)}>Ver Detalles</button>
                            {
                                eliminarTour && (
                                    <button onClick={() => eliminarTour(item.tipo, item.id)}>Eliminar Tour</button>
                                )
                            }
                            <br /> {/* espaciado entre items */}
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
