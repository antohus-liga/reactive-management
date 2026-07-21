import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";
import de from "./locales/de/translation.json";
import fr from "./locales/fr/translation.json";

i18n
    .use(ICU)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pt: { translation: pt },
            de: { translation: de },
            fr: { translation: fr },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
