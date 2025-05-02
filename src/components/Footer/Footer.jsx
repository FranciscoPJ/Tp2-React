import React from "react";
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-sky-900 text-white py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Logo y descripción */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">TourMundo</h2>
                        <p className="text-sm text-gray-300">
                            Explorá el mundo con nuestros tours nacionales e internacionales. Experiencias únicas, seguras y personalizadas.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Navegación</h3>
                        <ul className="space-y-1 text-sm text-gray-300">
                            <li><a href="#" className="hover:underline">Inicio</a></li>
                            <li><a href="#" className="hover:underline">Destinos</a></li>
                            <li><a href="#" className="hover:underline">Reservas</a></li>
                            <li><a href="#" className="hover:underline">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contacto</h3>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>📍 Av. Libertador 1234, Buenos Aires, Argentina</li>
                            <li>📞 +54 11 1234-5678</li>
                            <li>📧 info@tourmundo.com</li>
                        </ul>
                    </div>

                    {/* Redes sociales */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-200">🌐 Facebook</a>
                            <a href="#" className="hover:text-gray-200">📸 Instagram</a>
                            <a href="#" className="hover:text-gray-200">🐦 Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} TourMundo. Todos los derechos reservados.
                </div>
            </div>
        </footer>


    );
};

export default Footer;