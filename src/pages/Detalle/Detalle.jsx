import React, { useEffect, useState } from "react";

import Item from "../../components/Item/Item";
import { useParams } from "react-router-dom"; //  OJO: es "react-router-dom", no "react-router"
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";

function Detalle() {
  const favoritosGuardadas =
    JSON.parse(localStorage.getItem("favoritos")) || [];
  const [viajesFavoritos, setViajesFavoritos] = useState(favoritosGuardadas);
  const [yaAgregado, setYaAgregado] = useState(false);
  const [viaje, setViaje] = useState(null); // Inicializar como null porque viene un solo objeto
  const { t } = useTranslation();
  const { tipo, id } = useParams(); // Nos da el id que viene en la URL

  const getViajesInternacionales = async () => {
    try {
      const respuesta = await fetch(
        `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_internacionales/${id}`
      );

      const data = await respuesta.json();

      if (!respuesta.ok || !data || !data.id) {
        setViaje(undefined); // El tour con ID ${id} no fue encontrado
      } else {
        setViaje(data);
      }
    } catch (error) {
      console.log("@@@@, Error, no funciona tours internacionales: \n", error);
    }
  };

  const getViajesNacionales = async () => {
    // me traigo la api de tours nacionales
    try {
      const respuesta = await fetch(
        `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_nacionales/${id}`
      );
      const data = await respuesta.json();

      if (!respuesta.ok || !data || !data.id) {
        setViaje(undefined); // El tour con ID ${id} no fue encontrado
      } else {
        setViaje(data);
      }

      // console.log("Nacionales:", viajesNacionales);
    } catch (error) {
      console.log("@@@@, Error, no funciona tours nacionales: \n", error);
    }
  };

  useEffect(() => {
    if (!id || !tipo) {
      console.log("@@@@, Error: Falta tipo o id en la URL");
      setViaje(undefined);
      return;
    }

    if (tipo === "internacional") {
      getViajesInternacionales();
    } else if (tipo === "nacional") {
      getViajesNacionales();
    } else {
      console.log("@@@@, Error: Tipo inválido en la URL");
      setViaje(undefined);
    }

    localStorage.setItem("favoritos", JSON.stringify(viajesFavoritos));

    // Verificar si ya está en favoritos
    const existe = favoritosGuardadas.some(
      (fav) => fav.id === id && fav.tipo === tipo
    );
    setYaAgregado(existe);
    // hasta aca
  }, [id, tipo]); // Mejor poner [id, tipo] en dependencias, por si cambia el id

  const agregarFavoritos = (tour) => {
    const existe = viajesFavoritos.some(
      (fav) => fav.id === tour.id && fav.tipo === tipo
    );

    if (existe) {
      const nuevosFavoritos = viajesFavoritos.filter(
        (fav) => !(fav.id === tour.id && fav.tipo === tipo)
      );
      setViajesFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setYaAgregado(false); // cambia a NO agregado
    } else {
      const nuevosFavoritos = [...viajesFavoritos, { ...tour, tipo }];
      setViajesFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setYaAgregado(true); // cambia a agregado
    }
  };
  const handleDescargarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Detalle del Viaje", 10, 10);
    doc.setFontSize(12);
    let y = 20;

    if ("pais" in viaje) {
      // Internacional
      doc.text(`Imagen: ${viaje.coverImage}`, 10, y);
      y += 10;
      doc.text(`País: ${viaje.pais}`, 10, y);
      y += 10;
      doc.text(`Ciudad: ${viaje.ciudad}`, 10, y);
      y += 10;
      doc.text(`Atracciones: ${viaje.atracciones}`, 10, y);
      y += 10;

      const descripcionLimpia = viaje.descripcion || "";
      const descripcionDividida = doc.splitTextToSize(descripcionLimpia, 180);
      doc.text("Descripción:", 10, y);
      y += 10;
      doc.text(descripcionDividida, 10, y);
    } else if ("provincia" in viaje) {
      // Nacional
      doc.text(`Provincia: ${viaje.provincia}`, 10, y);
      y += 10;
      doc.text(`Lugares: ${viaje.lugares}`, 10, y);
      y += 10;

      const descripcionLimpia = viaje.descripcion || "";
      const descripcionDividida = doc.splitTextToSize(descripcionLimpia, 180);
      doc.text("Descripción:", 10, y);
      y += 10;
      doc.text(descripcionDividida, 10, y);
    } else {
      doc.text("Información del viaje no disponible.", 10, y);
    }

    doc.save(`viaje-${viaje.id}.pdf`);
  };

  return (
    <div>
      {/* Cargando... si viaje === null */}
      {viaje === null && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-6xl font-bold text-gray-700">{t("cargando")}</p>
        </div>
      )}

      {/* Error si viaje === undefined */}
      {viaje === undefined && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow">
          <h1 className="text-red-600 text-lg">{t("error404")}</h1>
          <p className="text-red-600 text-lg">{t("verificarTipoId")}</p>
          <button
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            onClick={navegarHomedHandler}
          >
            {t("home")}
          </button>
        </div>
      )}

      {/* Detalle si viaje tiene contenido */}
      {viaje && (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
            {t("detallesTour")}
          </h1>

          {/* Item centrado y con ancho máximo */}
          <div className="w-full  max-w-md">
            <Item
              item={viaje}
              agregarFavoritos={agregarFavoritos}
              yaAgregado={yaAgregado}
              descargarPdf={handleDescargarPDF}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Detalle;
