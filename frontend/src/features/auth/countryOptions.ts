import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json"

countries.registerLocale(en);

export const countryOptions = Object.entries(
    countries.getNames("en")
).map(([code, name]) => ({
    value: code,
    label: name,
}));