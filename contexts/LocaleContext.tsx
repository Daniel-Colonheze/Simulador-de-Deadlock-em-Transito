"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, Locale, TranslationKey } from "@/i18n/translations";

type TranslateFunction = (key: TranslationKey, params?: Record<string, string | number>) => string;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFunction;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or browser language
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "pt" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    } else {
      // Check browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      } else {
        setLocaleState("pt");
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("locale", locale);
      // Update html lang attribute
      document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    }
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t: TranslateFunction = (key, params) => {
    let text = translations[locale][key] || key;

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }

    return text;
  };

  if (!mounted) {
    return <>{children}</>;
  }

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
