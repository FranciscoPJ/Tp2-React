import { useEffect, useState } from "react";

import { ROUTES } from '../../const/routes'; // Ajusta la ruta si es distinta
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const Buscador = ({ tours }) => {
  const [busqueda, setBusqueda] = useState("");
  const { t, i18n } = useTranslation();
  const navegar = useNavigate();

  const navegarDetalledHandler = (tipo, id) => {
    const ruta = ROUTES.detalle
      .replace(':tipo?', tipo)
      .replace(':id?', id);
    navegar(ruta);
  };

  const normalizar = (texto) =>
    texto
      .toLowerCase()
      .normalize("NFD") // elimina acentos
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, ""); // elimina espacios y símbolos

  const buscarTour = (e) => {
    setBusqueda(e.target.value);
  };

  const toursFiltradas = () => {
    const termino = busqueda.trim().toLowerCase();
    return tours.filter((dato) =>
      dato.pais?.toLowerCase().includes(termino) ||
      dato.ciudad?.toLowerCase().includes(termino) ||
      dato.provincia?.toLowerCase().includes(termino) ||
      dato.lugares?.some(lugar => lugar.toLowerCase().includes(termino))
    );
  };

  useEffect(() => {
    //console.log("Tours originales:", tours);
    //console.log("Búsqueda:", busqueda);
    //console.log("Filtrados:", toursFiltradas());
  }, [busqueda, tours]);

  return (
    <>
      <div>
        <input
          id="busqueda"
          type="text"
          placeholder={t('ingresarUnTour')}
          value={busqueda}
          onChange={buscarTour}
          className="w-full max-w-3xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/*
        {t(`internacional.pais.${normalizar(item.pais)}`)}

        {t(`nacional.provincia.${normalizar(item.provincia)}`)}  lugares
      */}

      <div className="max-w-3xl space-y-0">
        {busqueda && toursFiltradas().length > 0 ? (
          toursFiltradas().map((tour, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <button onClick={() => navegarDetalledHandler(tour.tipo, tour.id)}>
                <h3 className="font-semibold text-lg">
                  {tour.tipo === 'internacional' ? (
                    <>
                      {t(`internacional.pais.${normalizar(tour.pais || "")}`)}. -{t(`internacional.ciudad.${normalizar(tour.ciudad || "")}`)}.
                    </>
                  ) : (
                    <>
                      {t(`nacional.provincia.${normalizar(tour.provincia || "")}`)}. -{" "}
                      {tour.lugares?.map((lugar, i) => (
                        <span key={i}>
                          {t(`nacional.lugares.${normalizar(lugar)}`)}
                          {i < tour.lugares.length - 1 ? ", " : ""}
                        </span>
                      ))}.
                    </>
                  )}
                </h3>
                {/* <p className="text-sm text-gray-600">{tour.descripcion}</p> */}
              </button>
            </div>
          ))
        ) : (
          busqueda && (
            <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <p className="text-gray-500 mt-2">{t('noResultados')}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Buscador;
