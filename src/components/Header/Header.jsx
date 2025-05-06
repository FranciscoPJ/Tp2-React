import { ROUTES } from "../../const/routes";
import React from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const navegar = useNavigate();

  const navegarFavoritosdHandler = () => {
    navegar(ROUTES.favoritos);
  };

  const navegarHomedHandler = () => {
    navegar(ROUTES.home);
  };

  const cambiarIdioma = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nuevoIdioma);
    localStorage.setItem("idioma", nuevoIdioma); // Guarda el idioma en localStorage
  };

  return (
    <header className="bg-gray-50 p-4 sticky top-0 z-50">
      <div className="flex sm:flex-row sm:items-center sm:justify-between gap-4 relative items-center">
        <div className="flex-shrink-0">
          <Link to="/" onClick={navegarHomedHandler}>
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-600">
              {t("title")}
            </h1>
          </Link>
        </div>

<<<<<<< HEAD
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-4 text-lg font-semibold">
            <li className="hover:text-blue-500">
              <Link to="/" onClick={navegarHomedHandler}>
                {t("home")}
              </Link>
            </li>
            <li className="hover:text-blue-500 ease-in">
              <Link to="/Favoritos" onClick={navegarFavoritosdHandler}>
                {t("favorites")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-shrink-0">
          <select
            onChange={cambiarIdioma}
            className="px-3 py-1 text-lg border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("seleccionarIdioma")}</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
=======
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
>>>>>>> b4dd7705dd6dc96db7e830055ebbbb35e4280f8c
