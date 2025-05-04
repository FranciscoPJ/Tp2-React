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

  const normalizar = (texto) =>
    (texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  return (
    <div>
      {item ? (
        <div key={item.id}>
          {item.tipo === "internacional" ? ( // si no tiene la clave provincia, muestra el item internacional
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
              {/* <div className="text-sky-600 font-bold mb-2">{item.id}</div> */}

              {agregarFavoritos ? (
                <div>
                  <img
                    src={item.coverImage}
                    alt={item.ciudad}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {t("pais")}:{" "}
                    {t(`internacional.pais.${normalizar(item.pais)}`)}
                  </div>

                  <div className="text-gray-700">
                    {t("ciudad")}:{" "}
                    {t(`internacional.ciudad.${normalizar(item.ciudad)}`)}
                  </div>

                  <div className="text-gray-700">
                    {t("atracciones")}: {item.atracciones.join(", ")}
                  </div>

                  <div className="text-gray-600 mb-4">
                    {t("descripcion")}:{" "}
                    {t(`internacional.descripcion.${item.id}`, {
                      defaultValue: item.descripcion,
                    })}
                  </div>

                  <button
                    className={`${
                      yaAgregado
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-sky-600 hover:bg-sky-700"
                    } text-white px-3 py-1 rounded mr-2`}
                    onClick={() => agregarFavoritos(item)}
                  >
                    {yaAgregado ? t("agregado") : t("agregarFavoritos")}
                  </button>

                  <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                    onClick={descargarPdf}
                  >
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
                    {t(`internacional.pais.${normalizar(item.pais)}`)}
                  </div>

                  <div className="text-gray-700">
                    {t(`internacional.ciudad.${normalizar(item.ciudad)}`)}
                  </div>

                  <button
                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mt-1"
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}
                  >
                    {t("verDetalles")}
                  </button>
                </>
              )}
              {eliminarTour && (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() => eliminarTour(item.tipo, item.id)}
                >
                  {t("eliminarTour")}
                </button>
              )}
            </div>
          ) : (
            // sino muestra el item nacional
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
              {/* <div className="text-sky-600 font-bold mb-2">{item.id}</div> */}
              {agregarFavoritos ? (
                <div>
                  <img
                    src={item.coverImage}
                    alt={item.provincia}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {t("provincia")}:{" "}
                    {t(`nacional.provincia.${normalizar(item.provincia)}`)}.
                  </div>

                  <div className="text-gray-700">
                    {t("lugares")}: {item.lugares.join(", ")}.
                  </div>

                  <div className="text-gray-600 mb-4">
                    {t("descripcion")}:{" "}
                    {t(`nacional.descripcion.${item.id}`, {
                      defaultValue: item.descripcion,
                    })}
                  </div>

                  <button
                    className={`${
                      yaAgregado
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-sky-600 hover:bg-sky-700"
                    } text-white px-3 py-1 rounded mr-2`}
                    onClick={() => agregarFavoritos(item)}
                  >
                    {yaAgregado ? t("agregado") : t("agregarFavoritos")}
                  </button>
                  <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                    onClick={descargarPdf}
                  >
                    {t("downloadPDF")}
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={item.coverImage}
                    alt={item.provincia}
                    className="w-full h-48 object-cover rounded"
                  />

                  <div className="text-gray-800 mt-[2px]">
                    {t(`nacional.provincia.${normalizar(item.provincia)}`)}.
                  </div>

                  <div className="text-gray-700">
                    {t(
                      `nacional.lugares.${normalizar(item.lugares?.[0] || "")}`
                    )}
                    .
                  </div>

                  <button
                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700  mt-2"
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}
                  >
                    {t("verDetalles")}
                  </button>
                </>
              )}
              {eliminarTour && (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600  ml-2"
                  onClick={() => eliminarTour(item.tipo, item.id)}
                >
                  {t("eliminarTour")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>{t("noHayResultados")}</div>
      )}
    </div>
  );
}
