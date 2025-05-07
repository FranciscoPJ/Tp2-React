import { ROUTES } from "../../const/routes";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Header() {
  const { t, i18n } = useTranslation();
  const navegar = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navegarFavoritosdHandler = () => {
    navegar(ROUTES.favoritos);
  };

  const navegarHomedHandler = () => {
    navegar(ROUTES.home);
  };

  const cambiarIdioma = (e) => {
    const nuevoIdioma = e.target.value;
    i18n.changeLanguage(nuevoIdioma);
    localStorage.setItem("idioma", nuevoIdioma);
  };

  return (
    <header className="bg-gray-50 p-4 sticky top-0 z-50 shadow">
      <div className="flex flex-wrap items-center justify-between gap-4 relative">
        <div className="flex-shrink-0">
          <Link to="/" onClick={navegarHomedHandler}>
            <h1 className="text-3xl sm:text-5xl font-bold text-sky-600">
              {t("title")}
            </h1>
          </Link>
        </div>

        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuAbierto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <nav
          className={`${
            menuAbierto ? "block" : "hidden"
          } sm:block absolute sm:static left-1/2 sm:left-auto transform sm:transform-none -translate-x-1/2 sm:translate-x-0 w-full sm:w-auto mt-2 sm:mt-0`}
        >
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-lg font-semibold bg-gray-50 sm:bg-transparent rounded-md p-4 sm:p-0 shadow sm:shadow-none">
            <li className="hover:text-blue-500">
              <Link
                to="/"
                onClick={() => {
                  navegarHomedHandler();
                  setMenuAbierto(false);
                }}
              >
                {t("home")}
              </Link>
            </li>
            <li className="hover:text-blue-500">
              <Link
                to="/Favoritos"
                onClick={() => {
                  navegarFavoritosdHandler();
                  setMenuAbierto(false);
                }}
              >
                {t("favorites")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-shrink-0">
          <select
            value={i18n.language}
            onChange={cambiarIdioma}
            className="px-3 py-1 text-lg border border-gray-300 rounded-md text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
