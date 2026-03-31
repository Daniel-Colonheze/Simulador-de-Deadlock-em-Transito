"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Locale, TranslationKey } from "@/i18n/translations";

type TranslateFunction = (key: TranslationKey, params?: Record<string, string | number>) => string;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFunction;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children, initialLocale = "pt" }: { children: ReactNode; initialLocale?: Locale }) {
  // Começa com o locale inicial (definido no servidor via cookie/header)
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Efeito que só roda no cliente para sobrescrever com preferências salvas/navegador
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "pt" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      } else {
        setLocaleState("pt");
      }
    }
  }, []);

  // Efeito para persistir e atualizar o atributo lang quando o locale muda
  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t: TranslateFunction = (key, params) => {
    let text = translations[locale][key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }
    return text;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}