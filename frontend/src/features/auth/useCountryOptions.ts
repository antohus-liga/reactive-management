import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import pt from "i18n-iso-countries/langs/pt.json";
import de from "i18n-iso-countries/langs/de.json";
import fr from "i18n-iso-countries/langs/fr.json";
import { useLanguage } from "@/hooks/useLanguage.ts";

countries.registerLocale(en);
countries.registerLocale(pt);
countries.registerLocale(de);
countries.registerLocale(fr);

// Derives country options/labels from the currently selected language,
// so both stay in sync with the language switcher + localStorage.
export default function useCountryOptions() {
    const { language } = useLanguage();

    const countryOptions = Object.entries(
        countries.getNames(language)
    ).map(([code, name]) => ({
        value: code,
        label: name,
    }));

    const countryLabels = Object.fromEntries(
        countryOptions.map(({ value, label }) => [value, label])
    );

    return { countryOptions, countryLabels };
}
