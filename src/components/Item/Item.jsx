import React, { useState } from "react";

import { ROUTES } from "../../const/routes"; // Ajusta la ruta si es distinta
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function Item({
  item,
  eliminarTour,
  agregarFavoritos,
  yaAgregado,
  descargarPdf,
}) {
  const { t, i18n } = useTranslation();
  const navegar = useNavigate();

  const navegarDetalledHandler = (tipo, id) => {
    const ruta = ROUTES.detalle.replace(":tipo?", tipo).replace(":id?", id);
    navegar(ruta);
  };

  const getTextoTraducido = (obj) => {
    const lang = localStorage.getItem("idioma") || "es";
    return obj?.[lang] || obj?.es || "";
  };
  

  return (
    <div>
      {item ? (
        <div key={item.id}>
          {item.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el item internacional
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">

              {agregarFavoritos ? (
                <div>
                  <img
                    src={item.coverImage}
                    alt={item.ciudad}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {t("country")}:{" "}{getTextoTraducido(item.pais)}.
                  </div>

                  <div className="text-gray-700">
                    {t("city")}:{" "}{item.ciudad}.
                  </div>

                  <div className="text-gray-700">
                    {t("attractions")}: {item.atracciones.join(", ")}.
                  </div>

                  <div className="text-gray-600 mb-4">
                    {t("description")}:{" "}{getTextoTraducido(item.descripcion)}   
                  </div>

                  <button
                    className={`${yaAgregado
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-sky-600 hover:bg-sky-700"
                      } text-white px-3 py-1 rounded mr-2`}
                    onClick={() => agregarFavoritos(item)}>
                    {yaAgregado ? t("added") : t("addFavorites")}
                  </button>

                  <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                    onClick={descargarPdf}>
                    {t("downloadPDF")}
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={item.coverImage}
                    alt={item.ciudad}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {getTextoTraducido(item.pais)}.
                  </div>

                  <div className="text-gray-700">
                    {item.ciudad}.
                  </div>

                  <button
                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mt-1"
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}>
                    {t("viewDetails")}
                  </button>
                </>
              )}
              {eliminarTour && (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() => eliminarTour(item.tipo, item.id)}>
                  {t("deleteTour")}
                </button>
              )}
            </div>
          ) : (
            // sino muestra el item nacional
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
              {agregarFavoritos ? (
                <div>
                  <img
                    src={item.coverImage}
                    alt={item.provincia.es}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {t("province")}:{" "}{getTextoTraducido(item.provincia)}.
                  </div>

                  <div className="text-gray-700">
                    {t("places")}: {item.lugares.join(", ")}.
                  </div>

                  <div className="text-gray-600 mb-4">
                    {t("description")}:{" "}{getTextoTraducido(item.descripcion)}                     
                  </div>

                  <button
                    className={`${yaAgregado
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-sky-600 hover:bg-sky-700"
                      } text-white px-3 py-1 rounded mr-2`}
                    onClick={() => agregarFavoritos(item)}>
                    {yaAgregado ? t("added") : t("addFavorites")}
                  </button>
                  
                  <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                    onClick={descargarPdf}>
                    {t("downloadPDF")}
                  </button>
                  
                </div>
                
              ) : (
                <>
                  <img
                    src={item.coverImage}
                    alt={item.provincia.es}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {getTextoTraducido(item.provincia)}.
                  </div>

                  <div className="text-gray-700">
                    {item.lugares?.[0] || ""}.
                  </div>

                  <button
                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700  mt-2"
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}>
                    {t("viewDetails")}
                  </button>
                </>
              )}
              {eliminarTour && (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600  ml-2"
                  onClick={() => eliminarTour(item.tipo, item.id)}
                >
                  {t("deleteTour")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>{t("noResults")}</div>
      )}
    </div>
  );
}
