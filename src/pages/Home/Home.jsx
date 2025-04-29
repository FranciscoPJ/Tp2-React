import './Home.module.css';

import { Navigate, useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';

import ListaItem from '../../components/ListaItem/ListaItem';
import { ROUTES } from '../../const/routes';

function Home() {
    const [viajesInternacionales, setViajesInternacionales] = useState([]);
    const [viajesNacionales, setViajesNacionales] = useState([]);

    const navegar = useNavigate();

    // const navegarDetalledHandler = () => {
    //     navegar(ROUTES.detalle);
    // }


    const getViajesInternacionales = async () => { // me traigo la api de tours internacionales
        try {
            const viajesInternacionalesResultado = await fetch(
                `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_internacionales`
            );
            const viajesInter = await viajesInternacionalesResultado.json();
            setViajesInternacionales(viajesInter);
            // console.log("Internacionales:", viajesInternacionales);
        } catch (error) {
            console.log("@@@@, Error, no funciona tours internacionles: \n", error);
        }
    };

    const getViajesNacionales = async () => { // me traigo la api de tours nacionales
        try {
            const viajesNacionalesResultado = await fetch(
                `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_nacionales`
            );
            const viajesNacio = await viajesNacionalesResultado.json();
            setViajesNacionales(viajesNacio);
            // console.log("Nacionales:", viajesNacionales);
        } catch (error) {
            console.log("@@@@, Error, no funciona tours nacionales: \n", error);
        }
    };

    useEffect(() => {
        getViajesInternacionales();
        getViajesNacionales();
    }, []);

    return (
        <div>

            <h1>Tours de Viaje</h1>

            <h2>Tours Internacionales</h2>
            {viajesInternacionales && <ListaItem listaItems={viajesInternacionales} />}

            <h2>Tours Nacionales</h2>
            {viajesNacionales && <ListaItem listaItems={viajesNacionales} />}

        </div>
    );
}

export default Home;
