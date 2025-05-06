import React, { useEffect, useState } from "react";

import Item from "../../components/Item/Item";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Detalle() {
  const favoritosGuardadas = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [viajesFavoritos, setViajesFavoritos] = useState(favoritosGuardadas);
  const [imagenesBase64, setImagenesBase64] = useState({});
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

        if (data.coverImage && !imagenesBase64[data.id]) {
          convertirYGuardarImagen(data.id, data.coverImage).catch((err) =>
            console.error("Error al convertir imagen:", err)
          );
        }
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

        if (data.coverImage && !imagenesBase64[data.id]) {
          convertirYGuardarImagen(data.id, data.coverImage).catch((err) =>
            console.error("Error al convertir imagen:", err)
          );
        }

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

  const convertirYGuardarImagen = (id, url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");

        setImagenesBase64((prev) => ({ ...prev, [id]: dataURL }));
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const getTextoTraducido = (obj) => {
    const lang = localStorage.getItem("idioma") || "es";
    return obj?.[lang] || obj?.es || "";
  };

  const handleDescargarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t("tourDetails"), 10, 10);
    doc.setFontSize(12);
    let y = 20;

    const imagen = imagenesBase64[viaje.id];
    if (imagen) {
      const img = new Image();
      img.src = imagen;

      img.onload = () => {
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxImageWidth = 160; // medida en "mm"
        const scaleFactor = Math.min(maxImageWidth / img.width, 1);
        const imageWidth = img.width * scaleFactor;
        const imageHeight = img.height * scaleFactor;
        const xCentered = (pageWidth - imageWidth) / 2;

        doc.addImage(imagen, "JPEG", xCentered, y, imageWidth, imageHeight);
        y += imageHeight + 10;

        agregarContenidoTexto(doc, y,  t);
      };
    } else {
      agregarContenidoTexto(doc, y, t);
    }

    function agregarContenidoTexto(doc, yInicial, t) {
      let y = yInicial;

      if ("pais" in viaje) {
        doc.text(`${t("country")}: ${getTextoTraducido(viaje.pais)}.`, 10, y);
        y += 10;        
        doc.text(`${t("city")}: ${viaje.ciudad}.`, 10, y);
        y += 10;

        const Atracciones = viaje.atracciones ? viaje.atracciones.join(", ") : ""; // Si es un arreglo, unimos con comas y espacio.
        doc.text(`${t("places")}: ${Atracciones}.`, 10, y);
        y += 10;

        const descripcionLimpia = getTextoTraducido(viaje.descripcion);
        const descripcionTexto = `${t("description")}: ${descripcionLimpia}`;
        const descripcionDividida = doc.splitTextToSize(descripcionTexto, 180);

        const lineHeight = 6; // Espaciado vertical personalizado (puede ajustar a gusto)

        descripcionDividida.forEach(linea => {
          doc.text(linea, 10, y);
          y += lineHeight;
        });
      } else if ("provincia" in viaje) {
        doc.text(`${t("province")}: ${getTextoTraducido(viaje.provincia)}.`, 10, y);
        y += 10;
        const lugares = viaje.lugares ? viaje.lugares.join(", ") : ""; // Si es un arreglo, unimos con comas y espacio.
        doc.text(`${t("places")}: ${lugares}.`, 10, y);
        y += 10;

        const descripcionLimpia = getTextoTraducido(viaje.descripcion);
        const descripcionTexto = `${t("description")}: ${descripcionLimpia}`;
        const descripcionDividida = doc.splitTextToSize(descripcionTexto, 180);

        const lineHeight = 6; // Espaciado vertical personalizado (puede ajustar a gusto)

        descripcionDividida.forEach(linea => {
          doc.text(linea, 10, y);
          y += lineHeight;
        });
      } else {
        doc.text("Información del viaje no disponible.", 10, y);
      }

      doc.save(`viaje-${viaje.id}.pdf`);
    }
  };  

  return (
    <div>
      {/* Cargando... si viaje === null */}
      {viaje === null && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-6xl font-bold text-gray-700">{t("loading")}</p>
        </div>
      )}

      {/* Error si viaje === undefined */}
      {viaje === undefined && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow">
          <h1 className="text-red-600 text-6xl font-bold">{t("error404")}.</h1>
          <p className="text-red-600 text-6xl font-semi-bold">{t("checkTypeOrId")}</p>
        </div>
      )}

      {/* Detalle si viaje tiene contenido */}
      {viaje && (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
            {t("tourDetails")}
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
