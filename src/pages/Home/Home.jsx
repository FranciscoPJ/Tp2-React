import "./Home.module.css";

import React, { useEffect, useState } from "react";

import Buscador from "../../components/Buscador/Buscador";
import ListaItem from "../../components/ListaItem/ListaItem";
import { useTranslation } from "react-i18next";

function Home() {
  const [viajesInternacionales, setViajesInternacionales] = useState([]);
  const [viajesNacionales, setViajesNacionales] = useState([]);

  const { t } = useTranslation();

  const getViajesInternacionales = async () => {
    // me traigo la api con todos los tours internacionales
    try {
      const viajesInternacionalesResultado = await fetch(
        `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_internacionales`
      );
      const viajesInter = await viajesInternacionalesResultado.json();
      setViajesInternacionales(viajesInter);
      // console.log("Internacionales:", viajesInternacionales);
    } catch (error) {
      console.log("@@@@, Error, no funciona tours internacionles: \n", error);
    }
  };

  const getViajesNacionales = async () => {
    // me traigo la api con todos los tours nacionales
    try {
      const viajesNacionalesResultado = await fetch(
        `https://680bf8e32ea307e081d2dac3.mockapi.io/api/v1/tours_nacionales`
      );
      const viajesNacio = await viajesNacionalesResultado.json();
      setViajesNacionales(viajesNacio);
      // console.log("Nacionales:", viajesNacionales);
    } catch (error) {
      console.log("@@@@, Error, no funciona tours nacionales: \n", error);
    }
  };

  useEffect(() => {
    getViajesInternacionales();
    getViajesNacionales();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {viajesInternacionales.length === 0 || viajesNacionales.length === 0 ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-6xl font-bold text-gray-700">{t("loading")}</p>
        </div>
      ) : (
        <div>
          <Buscador tours={[...viajesInternacionales, ...viajesNacionales]} />

          <h2 className="text-3xl font-bold text-emerald-700 mb-2 mt-[24px]">
            {t("internationalTours")}
          </h2>

          {viajesInternacionales && (
            <ListaItem listaItems={viajesInternacionales} />
          )}

          {/* font-semibold */}
          <h2 className="text-3xl font-bold text-emerald-700 mt-8 mb-2">
            {t("nationalTours")}
          </h2>

          {viajesNacionales && <ListaItem listaItems={viajesNacionales} />}
        </div>
      )}
    </div>
  );
}

export default Home;
