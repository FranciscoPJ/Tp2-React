// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './translation/en/translation.json';
import translationES from './translation/es/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEN },
            es: { translation: translationES },
        },
        lng: 'es', // Idioma por defecto: español
        fallbackLng: 'en', // ingles como respaldo

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

