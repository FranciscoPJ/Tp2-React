import './Home.module.css';

import React, { useEffect, useState } from 'react';

import ListaItem from '../../components/ListaItem/ListaItem';
import { ROUTES } from '../../const/routes';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

function Home() {
    const [viajesInternacionales, setViajesInternacionales] = useState([]);
    const [viajesNacionales, setViajesNacionales] = useState([]);

    const { t, i18n } = useTranslation();

    const navegar = useNavigate();

    const navegarFavoritosdHandler = () => {
        navegar(ROUTES.favoritos);
    };

    const cambiarIdioma = () => {
        const nuevoIdioma = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma); // Guarda el idioma en localStorage
    };

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
        <div className="bg-gray-100 min-h-screen p-6">

            {(viajesInternacionales.length === 0 || viajesNacionales.length === 0) ? (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <p className="text-6xl font-bold text-gray-700">
                        {t('cargando')}
                    </p>
                </div>
            ) : (
                <div>

                    <h1 className="text-3xl font-bold text-sky-600 mb-4">{t('titulo')}</h1>

                    <button
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                        onClick={navegarFavoritosdHandler}>
                        {t('favoritos')}
                    </button>

                    {/* -------------- boton de trasnlation -------------------- */}
                    <button
                        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 mr-2"
                        onClick={cambiarIdioma}>
                        {t('traducir')}
                    </button>                    
                    {/* -------------- boton de trasnlation -------------------- */}

                    <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
                        {t('toursInternacioales')}</h2>

                    {viajesInternacionales && <ListaItem listaItems={viajesInternacionales} />}

                    <h2 className="text-2xl font-semibold text-emerald-700 mt-8 mb-2">
                        {t('toursNacioales')}
                    </h2>

                    {viajesNacionales && <ListaItem listaItems={viajesNacionales} />}
                </div>
            )}

        </div>
    );
}

export default Home;
