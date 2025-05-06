import React from "react";
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-sky-900 text-white py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Logo y descripción   {t('footerTextoTourMundo')}*/}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{t('title')}</h2>
                        <p className="text-sm text-gray-300">
                            {t('footerTextTourMundo')}
                        </p>
                    </div>

                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{t('contact')}</h3>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>📍 Av. Argentina 345, Neuquén Capital, Argentina</li>
                            <li>📞 +54 299 1234-5678</li>
                            <li>📧 info@tourmundo.com</li>
                        </ul>
                    </div>

                    {/* Redes sociales */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{t('followUs')}</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-200">🌐 Facebook</a>
                            <a href="#" className="hover:text-gray-200">📸 Instagram</a>
                            <a href="#" className="hover:text-gray-200">🐦 X</a>
                        </div>
                    </div>

                </div>

                <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} {t('title')}. {t('allRightsReserved')}
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;