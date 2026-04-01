"use client";

import { motion } from "framer-motion";
import { Car, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocale } from "@/contexts/LocaleContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-1.5 sm:p-2 md:p-3 bg-gradient-to-br from-accent-north to-accent-east rounded-lg sm:rounded-xl"
            >
              <Car className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-foreground">
                {t("site.title")}
                <span className="text-gradient">{t("hero.highlight")}</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {t("site.subtitle")}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-secondary-foreground"
              title={t("button.theme")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Dark</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-secondary-foreground"
              title={t("button.language")}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {locale === "pt" ? "EN" : "PT"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}