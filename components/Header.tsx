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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-3 bg-gradient-to-br from-accent-north to-accent-east rounded-xl"
            >
              <Car className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t("site.title")}
                <span className="text-gradient">{t("hero.highlight")}</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("site.subtitle")}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-secondary-foreground"
              title={t("button.theme")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Dark</span>
                </>
              )}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-secondary-foreground"
              title={t("button.language")}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {locale === "pt" ? "EN" : "PT"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
