import { useEffect, useState } from "react";

import { ROUTES } from "../../const/routes"; // Ajusta la ruta si es distinta
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Buscador = ({ tours }) => {
  const [busqueda, setBusqueda] = useState("");
  const { t } = useTranslation();
  const navegar = useNavigate();

  const navegarDetalledHandler = (tipo, id) => {
    const ruta = ROUTES.detalle.replace(":tipo?", tipo).replace(":id?", id);
    navegar(ruta);
  };

  const buscarTour = (e) => {
    setBusqueda(e.target.value);
  };

  const getTextoTraducido = (obj) => {
    const lang = localStorage.getItem("idioma") || "es";
    return obj?.[lang] || obj?.es || "";
  };

  const toursFiltradas = () => {
    const termino = busqueda.trim().toLowerCase();
    return tours.filter(
      (dato) =>
        getTextoTraducido(dato.pais)?.toLowerCase().includes(termino) ||
        dato.ciudad?.toLowerCase().includes(termino) ||
        getTextoTraducido(dato.provincia)?.toLowerCase().includes(termino) ||
        dato.lugares?.some((lugar) => lugar.toLowerCase().includes(termino))
    );
  };

  useEffect(() => {}, [busqueda, tours]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
        <label className="mr-3 text-xl font-extralight">
          {t("inputLabel")}
        </label>
        <input
          id="busqueda"
          type="text"
          placeholder={t("enterTour")}
          value={busqueda}
          onChange={buscarTour}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="max-w-3xl space-y-0 mx-auto text-center">
        {busqueda && toursFiltradas().length > 0
          ? toursFiltradas().map((tour, index) => (
              <div
                key={index}
                className="flex justify-center"
              >
                <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition w-full">
                  <button
                    onClick={() => navegarDetalledHandler(tour.tipo, tour.id)}
                  >
                    <h3 className="font-semibold text-lg">
                      {tour.tipo === "internacional" ? (
                        <>
                          {getTextoTraducido(tour.pais) || ""}. -{" "}
                          {tour.ciudad || ""}.
                        </>
                      ) : (
                        <>
                          {getTextoTraducido(tour.provincia) || ""}. -{" "}
                          {tour.lugares?.map((lugar, i) => (
                            <span key={i}>
                              {lugar}
                              {i < tour.lugares.length - 1 ? ", " : ""}
                            </span>
                          ))}
                          .
                        </>
                      )}
                    </h3>
                  </button>
                </div>
              </div>
            ))
          : busqueda && (
              <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-gray-500 mt-2">{t("noMatches")}</p>
              </div>
            )}
      </div>
    </>
  );
};

export default Buscador;
