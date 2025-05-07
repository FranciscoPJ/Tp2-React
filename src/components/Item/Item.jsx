import Boton from "../Boton/Boton";
import { ROUTES } from "../../const/routes"; // Ajusta la ruta si es distinta
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Item({
  item,
  eliminarTour,
  agregarFavoritos,
  yaAgregado,
  descargarPdf,
}) {
  const { t } = useTranslation();
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
          {item.tipo === "internacional" ? (  // si no tiene la clave provincia, muestra el item internacional
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl border border-gray-200">
              {agregarFavoritos ? (
                <div> {/* asi se ve un tour internacional en Detalle*/}
                  <img
                    src={item.coverImage}
                    alt={item.ciudad}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="text-gray-800 mt-[2px]">
                    {t("country")}: {getTextoTraducido(item.pais)}
                  </div>
                  <div className="text-gray-700">
                    {t("city")}: {item.ciudad}
                  </div>
                  <div className="text-gray-700">
                    {t("attractions")}: {item.atracciones.join(", ")}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {t("description")}: {getTextoTraducido(item.descripcion)}
                  </div>
                  <Boton
                    texto={yaAgregado ? t("added") : t("addFavorites")}
                    onClick={() => agregarFavoritos(item)}
                    clase={`${yaAgregado ? "bg-emerald-600" : "bg-sky-600"
                      } hover:bg-emerald-700 text-white px-3 py-1 rounded mr-2`}
                  />
                  <Boton
                    texto={t("downloadPDF")}
                    onClick={descargarPdf}
                    clase="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                  />
                </div>
              ) : (
                <> {/* asi se ve un tour internacional en Home*/}
                  <img
                    src={item.coverImage}
                    alt={item.ciudad}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="text-gray-800 mt-[2px]">
                    {getTextoTraducido(item.pais)}
                  </div>
                  <div className="text-gray-700">
                    {item.ciudad}
                  </div>
                  <Boton
                    texto={t("viewDetails")}
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}
                    clase="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mt-1"
                  />
                </>
              )}
              {eliminarTour && (
                <Boton
                  texto={t("deleteTour")}
                  onClick={() => eliminarTour(item.tipo, item.id)}
                  clase="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                />
              )}
            </div>
          ) : ( 
            // si no es internaional, es nacional y asi se visualiza el tour en Detalle
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-gray-200">
              {agregarFavoritos ? (
                <div>
                  <img
                    src={item.coverImage}
                    alt={item.provincia.es}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="text-gray-800 mt-[2px]">
                    {t("province")}: {getTextoTraducido(item.provincia)}
                  </div>
                  <div className="text-gray-700">
                    {t("places")}: {item.lugares.join(", ")}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {t("description")}: {getTextoTraducido(item.descripcion)}
                  </div>
                  <Boton
                    texto={yaAgregado ? t("added") : t("addFavorites")}
                    onClick={() => agregarFavoritos(item)}
                    clase={`${yaAgregado ? "bg-emerald-600" : "bg-sky-600"
                      } hover:bg-emerald-700 text-white px-3 py-1 rounded mr-2`}
                  />
                  <Boton
                    texto={t("downloadPDF")}
                    onClick={descargarPdf}
                    clase="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded mr-2"
                  />
                </div>
              ) : (
                <> {/* asi se ve un tour nacional en Home*/}
                  <img
                    src={item.coverImage}
                    alt={item.provincia.es}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="text-gray-800 mt-[2px]">
                    {getTextoTraducido(item.provincia)}
                  </div>
                  <div className="text-gray-700">
                    {item.lugares?.[0] || ""}
                  </div>
                  <Boton
                    texto={t("viewDetails")}
                    onClick={() => navegarDetalledHandler(item.tipo, item.id)}
                    clase="bg-sky-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mt-2"
                  />
                </>
              )}
              {eliminarTour && (
                <Boton
                  texto={t("deleteTour")}
                  onClick={() => eliminarTour(item.tipo, item.id)}
                  clase="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                />
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