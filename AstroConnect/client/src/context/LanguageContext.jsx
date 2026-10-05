
import { createContext, useContext, useEffect, useState } from "react";
import translations from "../translations/translations.js";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("astroconnect_language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("astroconnect_language", language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  /*
    Supports both:

    t("about", "label")

    AND

    t("about.label")
  */
  const t = (section, key) => {
    let path = "";

    if (key !== undefined) {
      path = `${section}.${key}`;
    } else {
      path = section;
    }

    const getTranslation = (languageCode) => {
      const parts = path.split(".");

      let current = translations?.[languageCode];

      for (const part of parts) {
        current = current?.[part];

        if (current === undefined || current === null) {
          return undefined;
        }
      }

      return current;
    };

    // Current language
    const currentTranslation = getTranslation(language);

    if (
      currentTranslation !== undefined &&
      typeof currentTranslation !== "object"
    ) {
      return currentTranslation;
    }

    // English fallback
    const englishTranslation = getTranslation("en");

    if (
      englishTranslation !== undefined &&
      typeof englishTranslation !== "object"
    ) {
      return englishTranslation;
    }

    // Last fallback
    return key || section;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
