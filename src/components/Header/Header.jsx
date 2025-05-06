import { ROUTES } from '../../const/routes';
import React from "react";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

function Header() {

    const { t, i18n } = useTranslation();
    const navegar = useNavigate();

    const navegarFavoritosdHandler = () => {
        navegar(ROUTES.favoritos);
    };

    const navegarHomedHandler = () => {
        navegar(ROUTES.home);
    }

    const cambiarIdioma = () => {
        const nuevoIdioma = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma); // Guarda el idioma en localStorage
    };

    return (
        <header className="bg-gray-50 p-4 sticky top-0 z-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-sky-600">
                    {t('title')}
                </h1>

                <div className="flex flex-wrap gap-2 mt-4">
                    <button
                        className="bg-teal-600 text-white px-4 py-1.5 rounded hover:bg-teal-700"
                        onClick={cambiarIdioma}>
                        {t('translate')}
                    </button>

                    <button
                        className="bg-sky-600 text-white px-4 py-1.5 rounded hover:bg-sky-700"
                        onClick={navegarHomedHandler}>
                        {t('home')}
                    </button>

                    <button
                        className="bg-emerald-600 text-white px-4 py-1.5 rounded hover:bg-emerald-700"
                        onClick={navegarFavoritosdHandler}>
                        {t('favorites')}
                    </button>
                </div>
            </div>
        </header>

    );
};

export default Header;