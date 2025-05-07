import Boton from "../Boton/Boton";
import { ROUTES } from "../../const/routes";
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

  const BotonesAccion = () => (
    <div className="flex flex-wrap gap-2 pt-2">
      <Boton
        texto={yaAgregado ? t("added") : t("addFavorites")}
        onClick={() => agregarFavoritos(item)}
        clase={`${
          yaAgregado ? "bg-emerald-600" : "bg-sky-600"
        } hover:bg-emerald-700 text-white px-3 py-1 rounded`}
      />
      <Boton
        texto={t("downloadPDF")}
        onClick={descargarPdf}
        clase="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded"
      />
    </div>
  );

  const BotonEliminar = () =>
    eliminarTour && (
      <Boton
        texto={t("deleteTour")}
        onClick={() => eliminarTour(item.tipo, item.id)}
        clase="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
      />
    );

  if (!item) return <div>{t("noResults")}</div>;

  const esInternacional = item.tipo === "internacional";

  return (
    <div key={item.id} className="mb-4">
      {agregarFavoritos ? (
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl border border-gray-200 overflow-hidden">
          <img
            src={item.coverImage}
            alt={esInternacional ? item.ciudad : item.provincia.es}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-4 space-y-2 text-sm text-gray-800">
            {esInternacional ? (
              <>
                <div>
                  <strong>{t("country")}:</strong>{" "}
                  {getTextoTraducido(item.pais)}
                </div>
                <div>
                  <strong>{t("city")}:</strong> {item.ciudad}
                </div>
                <div>
                  <strong>{t("attractions")}:</strong>{" "}
                  {item.atracciones.join(", ")}
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>{t("province")}:</strong>{" "}
                  {getTextoTraducido(item.provincia)}
                </div>
                <div>
                  <strong>{t("places")}:</strong> {item.lugares.join(", ")}
                </div>
              </>
            )}
            <div className="text-gray-600">
              <strong>{t("description")}:</strong>{" "}
              {getTextoTraducido(item.descripcion)}
            </div>
            <BotonesAccion />
          </div>
          <BotonEliminar />
        </div>
      ) : (
        // cuando `agregarFavoritos` es falso se muestra home/favoritos
        <div className="bg-white shadow rounded-lg overflow-hidden p-4">
          <img
            src={item.coverImage}
            alt={esInternacional ? item.ciudad : item.provincia.es}
            className="w-full h-48 object-cover rounded"
          />
          <div className="mt-2 text-gray-800 font-medium text-base">
            {esInternacional
              ? getTextoTraducido(item.pais)
              : getTextoTraducido(item.provincia)}
          </div>
          <div className="text-gray-600 text-sm">
            {esInternacional ? item.ciudad : item.lugares?.[0] || ""}
          </div>
          <Boton
            texto={t("viewDetails")}
            onClick={() => navegarDetalledHandler(item.tipo, item.id)}
            clase="bg-sky-600 text-white px-4 py-1 rounded-md hover:bg-emerald-700 mt-2 transition-colors"
          />
          <BotonEliminar />
        </div>
      )}
    </div>
  );
}
